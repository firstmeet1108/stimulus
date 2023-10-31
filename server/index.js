const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world'
  await next()
})

app.use(router.routes()).use(router.allowedMethods())
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
)
app.use(async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = 'hello world'
  await next()
})

app.listen(3000)
