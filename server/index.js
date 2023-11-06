const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')

// 创建 koa 实例
const app = new Koa()

// 创建路由实例
const router = new Router()

router.post('/', async (ctx) => {
  console.log(ctx.request.body)
})

app.use(cors())

app.use(router.routes())

const PORT = 6671

app.listen(PORT, () => {
  console.log(`starting at http://127.0.0.1:${PORT}`)
})
