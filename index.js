// Import required modules
const Koa = require('koa');
const bcrypt = require('bcrypt');
const session = require('koa-session');
const Router = require('koa-router');
const stat = require('koa-static');
const handlebars = require('koa-hbs-renderer');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Create Koa app
const app = new Koa();
const router = new Router();

// Configure middleware
app.use(stat('public'));
app.use(bodyParser());
app.use(handlebars({ paths: { views: `${__dirname}/views` } }));
app.keys = [crypto.randomBytes(32).toString('hex')];
app.use(session(app));
app.use(router.routes());

// Connect to SQLite DB
let db;
open({
  filename: './bookshop.db',
  driver: sqlite3.Database,
})
  .then((database) => {
    db = database;
    console.log('Database connection is ready');
  })
  .catch((err) => {
    console.log(err.message);
  });

// Define the requireLogin middleware
const requireLogin = async (ctx, next) => {
  if (ctx.path !== '/login' && ctx.path !== '/register' && !ctx.session.user) {
    return ctx.redirect('/login');
  }
  await next();
};
router.get('/', async (ctx) => {
  ctx.redirect('/login');
});

router.get('/login', async (ctx) => {
  if (ctx.session.user) {
    ctx.redirect('/home');
  } else {
    await ctx.render('login');
  }
});

// Handle login form submission
router.post('/login', async (ctx) => {
  // Retrieve user credentials from request body
  const { username, password } = ctx.request.body;

  try {
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (!user) {
      ctx.status = 401;
      console.log('User does not exist');
      await ctx.render('login', { error: 'Invalid username or password' });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      ctx.status = 401;
      console.log('Invalid password');
      await ctx.render('login', { error: 'Invalid username or password' });
      return;
    }

    ctx.session.user = { id: user.id, username: user.username };

    console.log('Login successful');

    ctx.redirect('/home');
  } catch (err) {
    console.error('Login error:', err);
    ctx.status = 500;
    await ctx.render('login', { error: 'An error occurred during login' });
  }
});

// Render registration page
router.get('/register', async (ctx) => {
  await ctx.render('register');
});


// Register route
router.get('/register', async (ctx) => {
  await ctx.render('register')
});

router.post('/register', async (ctx) => {
  const { username, password, confirmPassword } = ctx.request.body

  // Validate user input
  if (!username || !password || !confirmPassword) {
    ctx.flash = { error: 'Please enter a username, password and confirm password' }
    ctx.redirect('/register')
    return
  }

  if (password !== confirmPassword) {
    ctx.flash = { error: 'Passwords do not match' }
    ctx.redirect('/register')
    return
  }

  try {
    // Check if the user already exists in the database
    const user = await db.get('SELECT * FROM users WHERE username = ?', username)
    if (user) {
      ctx.flash = { error: 'User already exists' }
      ctx.redirect('/register')
      return
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user in the database
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, hashedPassword)

    // Redirect to login page after successful registration
    ctx.flash = { success: 'Registration successful, please log in' }
    ctx.redirect('/login')
    return
  } catch (err) {
    ctx.flash = { error: err.message }
    ctx.redirect('/register')
    return
  }
});

// Logout
router.get('/logout', async ctx => {
  ctx.session = null
  ctx.redirect('/')
});


router.get('/home', requireLogin, async ctx => {
  try {
    console.log('/home')
    const sql = 'SELECT id, title FROM books;'
    const data = await db.all(sql)
    console.log(data)
    await ctx.render('home', {title: 'Favourite Books', books: data})
  } catch(err) {
    ctx.body = err.message
  }
});

// Book details page
router.get('/details/:id', requireLogin, async (ctx) => {
  try {
    const bookId = ctx.params.id;

    const bookSql = `SELECT * FROM books WHERE id = ${bookId};`;
    const bookData = await db.get(bookSql);

    if (!bookData) {
      // Book not found, display an error message
      ctx.body = 'Book not found';
      return;
    }

    const commentsSql = `SELECT * FROM comments WHERE book_id = ${bookId};`;
    const commentsData = await db.all(commentsSql);

    await ctx.render('details', { ...bookData, comments: commentsData, username: ctx.session.user.username });
  } catch (err) {
    ctx.body = err.message;
  }
});



// Update book page
router.get('/details/:id/update', requireLogin, async ctx => {
  const id = ctx.params.id
  const data = await db.get(`SELECT * FROM books WHERE id=${id}`)
  await ctx.render('update', {data})
})

router.post('/details/:id/update',requireLogin, async ctx => {
  const id = ctx.params.id
  const body = ctx.request.body
  const sql = `UPDATE books SET title="${body.title}", isbn="${body.isbn}", description="${body.description}" WHERE id=${id};`
  await db.exec(sql)
  ctx.redirect(`/details/${id}`)
})

// Delete book
router.post('/details/:id/delete', requireLogin, async ctx => {
  const id = ctx.params.id
  const sql = `DELETE FROM books WHERE id=${id};`
  await db.exec(sql)
  ctx.redirect('/')
})

// Render form
router.get('/form',requireLogin, async ctx => {
  await ctx.render('form');
});

// Handle add form submission
router.post('/add', requireLogin, async ctx => {
  try {
    const { title, isbn, description } = ctx.request.body
    const sql = `INSERT INTO books(title, isbn, description) 
      VALUES("${title}", "${isbn}", "${description}");`
    await db.exec(sql)
    ctx.redirect('/')
  } catch(err) {
    ctx.body = err.message
  }
});
// Handle thumbs up
router.post('/thumbs/up', requireLogin, async ctx => {
  try {
    const { bookId, userId } = ctx.request.body;
    const sql = `INSERT INTO thumbs (book_id, user_id, type) VALUES (?, ?, 'up');`;
    await db.run(sql, bookId, userId);
    ctx.redirect(`/details/${bookId}`);
  } catch (err) {
    ctx.body = err.message;
  }
});

// Handle thumbs down
router.post('/thumbs/down', requireLogin, async ctx => {
  try {
    const { bookId, userId } = ctx.request.body;
    const sql = `INSERT INTO thumbs (book_id, user_id, type) VALUES (?, ?, 'down');`;
    await db.run(sql, bookId, userId);
    ctx.redirect(`/details/${bookId}`);
  } catch (err) {
    ctx.body = err.message;
  }
});

// Handle comment submission

router.post('/comments', requireLogin, async ctx => {
  try {
    const { bookId, userId, comment } = ctx.request.body;
    const username = ctx.request.body.username; // Retrieve the username from the request body
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const sql = `INSERT INTO comments (book_id, user_id, username, comment, timestamp) VALUES (?, ?, ?, ?, ?);`;
    await db.run(sql, bookId, userId, username, comment, timestamp);
    ctx.redirect(`/details/${bookId}`); // book Id
  } catch (err) {
    ctx.body = err.message;
  }
});

// Render search page
router.get('/search', requireLogin, async (ctx) => {
  await ctx.render('search');
});

// Handle search form submission
router.get('/search-results', requireLogin, async (ctx) => {
  const query = ctx.query.query; // Get the search query from the URL parameters
  
  // Example: External API call using Google Books API
  const apiKey = 'AIzaSyA1afOxrOZB-U5MuPQiOSvrwGLoVRIMjI8';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract relevant information from the API response
    const books = data.items.map((item) => ({
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks?.thumbnail,
      link: item.volumeInfo.infoLink,
    }));

    // Render the search results directly in the router handler
    await ctx.render('search', { query, books });
  } catch (err) {
    console.error('Error occurred during API request:', err);
    // Handle error and render an error page
    await ctx.render('error', { error: 'An error occurred during the search' });
  }
});




const port = 8080; // Define the port number here

module.exports = app.listen(port, () => console.log(`listening on port ${port}`));