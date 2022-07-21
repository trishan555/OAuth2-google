const express = require('express')
const passport = require('passport')
const { googleAuth } = require('./configs/google.auth')
const session = require('express-session')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.get('/', (req, res) => {
    res.send('Helllo')
})
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
    googleAuth(passport)
})
