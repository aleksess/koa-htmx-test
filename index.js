const koa = require('koa');
const path = require('path')
const render = require('@koa/ejs');
const router = require('./routes');
const { NotFoundError } = require('./errors');

const app = new koa();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
})

app.use(router.routes())

app.listen(3000)


