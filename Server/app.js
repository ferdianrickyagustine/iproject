if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./routers')
const app = express()
const cors = require('cors')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors("*"))
app.use(router)



module.exports = app