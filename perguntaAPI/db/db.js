const mongoose = require('mongoose')

exports.connect = () => {
    mongoose.connect('mongodb://localhost:27017/pergunta')
}

exports.disconnect = () => {
    mongoose.disconnect()
}