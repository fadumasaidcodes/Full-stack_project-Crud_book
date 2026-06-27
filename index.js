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
const axios = require('axios');

const app = new Koa();
const router = new Router();

// Configure middleware
app.use(stat('public'));
app.use(bodyParser());
app.use(handlebars({ paths: { views: `${__dirname}/views` } }));

app.keys = [crypto.randomBytes(32).toString('hex')];
app.use(session(app));

app.use(router.routes());
app.use(router.allowedMethods());

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

/* ========================
   ROUTES (unchanged)
======================== */
// KEEP ALL YOUR ROUTES EXACTLY AS THEY ARE ABOVE


// ------------------------
// IMPORTANT FIX FOR TESTING
// ------------------------



const port = 8080;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// ✅ EXPORT BOTH (THIS IS KEY FOR JEST)
module.exports = {
  app,
  server
};