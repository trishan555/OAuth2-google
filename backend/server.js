const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.get('/', (req, res) => {
    res.send('Helllo')
})

app.listen(process.env.PORT, (err) => {
    err
        ? console.log(err)
        : console.log(`App is running on port ${process.env.PORT}`)
})
