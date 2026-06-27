const bcrypt = require('bcrypt');

const authController = {
  showLogin: async (ctx) => {
    ctx.status = 200;
    await ctx.render('login');
  },
  
  login: async (ctx) => {
    const { username, password } = ctx.request.body;
    
    // For now, let's use a dummy check. 
    // In the next step, we will connect this to your bookshop.db!
    if (username === 'admin' && password === 'password') {
      ctx.session.user = username;
      ctx.redirect('/');
    } else {
      ctx.status = 401;
      await ctx.render('login', { error: 'Invalid credentials' });
    }
  },

  showRegister: async (ctx) => {
    ctx.status = 200;
    await ctx.render('register');
  }
};

module.exports = authController;
