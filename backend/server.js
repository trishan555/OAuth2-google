const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const passport = require('passport')
const { googleAuth } = require('./configs/google.auth')
const { authRoute } = require('./routes/auth.route')
const session = require('express-session')
const app = express()

app.get('/', (req, res) => {
    res.send("<a href='http://localhost:3990/auth/google'>click me</a>")
})
app.use(cors())
app.use(express.json({ limit: '20mb' }))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            expires: new Date(Date.now() + 10000),
            maxAge: 10000,
        },
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
    authRoute(app, passport)
    googleAuth(passport)
})
