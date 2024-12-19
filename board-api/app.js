const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const { sequelize } = require('./models/index')
const { error } = require('console')
const passportConfig = require('./passport/index')

const app = express()

passportConfig() //passport 실행

app.set('port', process.env.PORT || 8002)

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

//미들웨어 설정
app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser(process.env.COOKIE_SECRET)) //쿠키설정
//세션설정
app.use(
   session({
      resave: false, //세션 데이터가 변경되면 재저장할지 여부 -> 변경사항이 있어야 재저장
      saveUninitialized: true, //초기화되지않은 세션 저장 여부 -> 초기화되지 않은 빈 세션도 저장
      secret: process.env.COOKIE_SECRET, //세션 암호화 키
      cookie: {
         httpOnly: true, //javascript로 쿠키에 접근가능한지 여부 -> true일 경우 접근 X
         secure: false, // https를 사용할때만 쿠키전송여부 -> http, https 둘다 사용가능
      },
   })
)
//passport 초기화, 세션연동
app.use(passport.initialize()) //초기화
app.use(passport.session()) //passport와 생성해둔 세션 연결

//라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'

   console.log(err)

   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

app.options('*', cors())

app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
