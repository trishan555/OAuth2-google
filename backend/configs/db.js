const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    const connection = mongoose.connection
    connection.once('open', function () {
        console.log('MongoDB connection established successfully')
    })
}
module.exports = connectDB
