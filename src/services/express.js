require('dotenv').config()
const express = require('express')
const findBojs = require('./puppeteer')
const app = express()

const port = process.env.PORT || 5000

app.set('port', port)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* 
    Endpoints
*/
app.get('/', (req, res) => res.json({message: "Ok"}))

// dominio:port/api/v1/jobs?keywords=php laravel
app.post('/api/v1/jobs', async (req, res) => {
    const keywords = req.query.keywords

    const jobs = await findBojs(keywords)

    res.json({keywords,jobs})
})


module.exports = app