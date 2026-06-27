const Koa = require('koa');
const session = require('koa-session');
const stat = require('koa-static');
const bodyParser = require('koa-bodyparser');
const handlebars = require('koa-hbs-renderer');
const crypto = require('crypto');
const path = require('path');
const router = require('./routes'); 

const app = new Koa();

/* ========================
   MIDDLEWARE
======================== */
app.use(stat(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(handlebars({ paths: { views: path.join(__dirname, 'views') } }));

app.keys = [crypto.randomBytes(32).toString('hex')];
app.use(session(app));

/* ========================
   ATTACH ROUTES
======================== */
app.use(router.routes());
app.use(router.allowedMethods());

/* ========================
   SERVER (TEST SAFE)
======================== */
const port = 8080;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`listening on port ${port}`);
  }
});

/* ========================
   EXPORT
======================== */
module.exports = { app, server };
