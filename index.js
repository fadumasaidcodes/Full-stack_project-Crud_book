#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const bcrypt = require('bcrypt')
const session = require('koa-session');
const Router = require('koa-router')
const stat = require('koa-static')
const handlebars = require('koa-hbs-renderer')
const bodyParser = require('koa-bodyparser')
const crypto = require('crypto') // Add this line to import the crypto module

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(bodyParser())
app.use(handlebars({ paths: { views: `${__dirname}/views` } }))
app.use(router.routes())
app.use(bodyParser())
const sessionSecretKey = crypto.randomBytes(32).toString('hex');

// Initialize session middleware
app.keys = [sessionSecretKey];
app.use(session(app));
const port = 8080
let db = {}

// Connect to Sqlite DB
open({
  filename: './bookshop.db',
  driver: sqlite3.Database
}).then((DB) => {
  db = DB
  console.log('Database connection is ready')
}).catch((err) => {
  console.log(err.message)
})

router.get('/home', async ctx => {
  try {
    console.log('/home')
    const sql = 'SELECT id, title FROM books;'
    const data = await db.all(sql)
    console.log(data)
    await ctx.render('home', {title: 'Favourite Books', books: data})
  } catch(err) {
    ctx.body = err.message
  }
})

router.get('/details/:id', async ctx => {
  try {
    console.log(ctx.params.id)
    const sql = `SELECT * FROM books WHERE id = ${ctx.params.id};`
    const data = await db.get(sql)
    console.log(data)
    await ctx.render('details', data)
  } catch(err) {
    ctx.body = err.message
  }
});

router.get('/form', async ctx => await ctx.render('form'));

router.post('/add', async ctx => {
  try {
    console.log(ctx.request.body)
    const body = ctx.request.body
    const sql = `INSERT INTO books(title, isbn, description) 
      VALUES("${body.title}", "${body.isbn}", "${body.description}");`
    console.log(sql)
    await db.exec(sql)
    ctx.redirect('/')
  } catch(err) {
    ctx.body = err.message
  }
});
router.get('/details/:id/update', checkAuth, async ctx => {
  const id = ctx.params.id
  const data = await db.get(`SELECT * FROM books WHERE id=${id}`)
  await ctx.render('update', {data})
})

router.post('/details/:id/update', checkAuth, async ctx => {
  const id = ctx.params.id
  const body = ctx.request.body
  const sql = `UPDATE books SET title="${body.title}", isbn="${body.isbn}", description="${body.description}" WHERE id=${id};`
  await db.exec(sql)
  ctx.redirect(`/details/${id}`)
})

  
  // Delete a book

  router.post('/details/:id/delete', checkAuth, async ctx => {
    const id = ctx.params.id
    const sql = `DELETE FROM books WHERE id=${id};`
    await db.exec(sql)
    ctx.redirect('/')
  })
  
// Redirect root route to login page
router.get('/', async (ctx) => {
  if (ctx.session.user) {
    ctx.redirect('/home');
  } else {
    ctx.redirect('/login');
  }
});

// Render login page
router.get('/login', async (ctx) => {
  if (ctx.session.user) {
    ctx.redirect('/home');
  } else {
    await ctx.render('login');
  }
});

// Handle login form submission
router.post('/login', async ctx => {
  // Retrieve user credentials from request body
  const { username, password } = ctx.request.body

  // Retrieve user from database
  const db = await open({
    filename: './bookshop.db',
    driver: sqlite3.Database
  })
  const user = await db.get('SELECT * FROM users WHERE username = ?', username)

  // Check if user exists
  if (!user) {
    ctx.status = 401
    await ctx.render('login', { error: 'Invalid username or password' })
    return
  }

  // Check if password is correct
  const passwordIsValid = await bcrypt.compare(password, user.password)
  if (!passwordIsValid) {
    ctx.status = 401
    await ctx.render('login', { error: 'Invalid username or password' })
    return
  }

  // Set session data
  ctx.session.user = { id: user.id, username: user.username }

  // Redirect to home page
  ctx.redirect('/home');
});

const checkAuth = (ctx, next) => {
  if (!ctx.session.user) {
    ctx.redirect('/login')
    return
  }
  next()
}




// Register route
router.get('/register', async (ctx) => {
  await ctx.render('register')
})

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
})


module.exports = app.listen(port, () => console.log(`listening on port ${port}`))