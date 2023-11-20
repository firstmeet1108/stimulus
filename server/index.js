const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const nodemailer = require('nodemailer')
const config = require('../config')

// 创建 koa 实例
const app = new Koa()

const transporter = nodemailer.createTransport({
  // host: 'smtp.qq.com',
  port: 465,
  service: 'qq',
  secure: true, // true for 465, false for other ports
  auth: {
    // 发送邮件的邮箱和授权码（不是密码）
    user: '2022742378@qq.com',
    pass: config.MailPass,
  },
})

const mailOptions = {
  from: '"firstmeet" <2022742378@qq.com>',
  to: '2022742378@qq.com',
  subject: 'Stimulus docs更新通知',
}
// 创建路由实例
const router = new Router()
app.use(bodyParser())

router.post('/', async (ctx) => {
  const pushData = ctx.request.body
  const detail = JSON.parse(pushData.payload)
  console.log(detail.head_commit.modified)
  const updateFiles = detail.head_commit.modified
  const checkUrl = detail.head_commit.url
  mailOptions.html = `<b>stimulus文档粗稿待审，请前往 <a href="${checkUrl}"> ${checkUrl} </a> 查看更新</b>`
  updateFiles.forEach((element) => {
    const dir = element.split('/')[0]
    if (dir === 'docs') {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
        console.log('已通知管理员更新文档')
      })
    }
  })
  ctx.body = 'OK'
})

app.use(cors())

app.use(router.routes())

const PORT = 6671

app.listen(PORT, () => {
  console.log(`starting at http://127.0.0.1:${PORT}`)
})
