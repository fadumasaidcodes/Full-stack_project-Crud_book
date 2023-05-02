#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const stat = require('koa-static')
const handlebars = require('koa-hbs-renderer')
const bodyParser = require('koa-bodyparser')

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(bodyParser())
app.use(handlebars({ paths: { views: `${__dirname}/views` } }))
app.use(router.routes())
app.use(bodyParser())

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

router.get('/', async ctx => {
  try {
    console.log('/')
    const sql = 'SELECT id, title FROM books;'
    const data = await db.all(sql)
    console.log(data)
    await ctx.render('home', {title: 'Favourite Books', books: data})
  } catch(err) {
    ctx.body = err.message
  }
})

router.get('/search', async ctx => {
  try {
    let sql = 'SELECT id, title FROM books;';
    let querystring = '';
    let resultsCount = 0;
    if (ctx.query.q) {
      const searchTerm = ctx.query.q.toUpperCase();
      sql = `SELECT * FROM books WHERE upper(title) LIKE ? OR upper(description) LIKE ? OR upper(author) LIKE ? OR upper(publisher) LIKE ? OR year = ?`;
      const data = await db.all(sql, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, searchTerm]);
      books = data;
      querystring = ctx.query.q;
      resultsCount = data.length;
    }
    await ctx.render('newindex', { title: 'Bookshop', books, query: querystring, resultsCount });
  } catch (err) {
    ctx.body = err.message;
  }
});

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

router.get('/details/:id/update', async ctx => {
	const id = ctx.params.id
	const data = await db.get(`SELECT * FROM books WHERE id=${id}`)
	await ctx.render('update', {data})
  })
  
  router.post('/details/:id/update', async ctx => {
	const id = ctx.params.id
	const body = ctx.request.body
	const sql = `UPDATE books SET title="${body.title}", isbn="${body.isbn}", description="${body.description}" WHERE id=${id};`
	await db.exec(sql)
	ctx.redirect(`/details/${id}`)
  })
  
  // Delete a book
  router.get('/details/:id/delete', async ctx => {
	const id = ctx.params.id
	const sql = `DELETE FROM books WHERE id=${id};`
	await db.exec(sql)
	ctx.redirect('/')
  })
  

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))