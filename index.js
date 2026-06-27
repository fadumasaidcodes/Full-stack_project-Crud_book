const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const stat = require('koa-static');
const bodyParser = require('koa-bodyparser');
const handlebars = require('koa-hbs-renderer');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();

/* ========================
   MIDDLEWARE
======================== */
app.use(stat('public'));
app.use(bodyParser());
app.use(handlebars({ paths: { views: `${__dirname}/views` } }));

app.keys = [crypto.randomBytes(32).toString('hex')];
app.use(session(app));

/* ========================
   ROUTES
======================== */

// MUST pass test: redirect
router.get('/', async (ctx) => {
  ctx.status = 302;
  ctx.redirect('/login');
});

// MUST pass test: render login page
router.get('/login', async (ctx) => {
  ctx.status = 200;
  await ctx.render('login');
});

/* ========================
   ATTACH ROUTES
======================== */
app.use(router.routes());
app.use(router.allowedMethods());

/* ========================
   SERVER (TEST SAFE)
======================== */
const port = 8080;

// Always create the server instance so the test can close it
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`listening on port ${port}`);
  }
});

/* ========================
   EXPORT
======================== */
// Change this from 'module.exports = app' to:
module.exports = { app, server };
