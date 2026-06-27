const bookController = {
  index: async (ctx) => {
    ctx.status = 302;
    ctx.redirect('/login');
  }
};

module.exports = bookController;
