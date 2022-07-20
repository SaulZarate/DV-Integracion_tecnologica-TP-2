require('dotenv').config()
const express = require('express')
const connectDb = require('../database/conect')
const History = require('../models/history.model')
const Job = require('../models/job.model')

// Puppeteer
const findBojs = require('./puppeteer')


const app = express()
const port = process.env.PORT || 5000

app.set('port', port)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* 
    Endpoints
*/
app.get('/', (req, res) => res.send("Hola mundo!"))
app.get('/test/conectDB', async (req, res) => {
    try {
        const db = await connectDb()
    } catch (error) {
        res.send('Error en la conexión')
    }
    res.send('Ok')
})
app.get('/test/DB/createJob', async (req, res) => {
    try {
        const connect = await connectDb()
        const job1 = new Job({title:'Title1', link:'https://www.google.com.ar', ubicacion: 'Argentina - C.A.B.A.', fecha:'Hace 1 día' })
        const jobDB = await job1.save()
    } catch (error) {
        res.send('Error en el servidor')
    }
    res.send('Se guardo un empleo')
})
app.get('/test/DB/createHistory', async (req, res) => {
    try {
        const connect = await connectDb()
        const job1 = new Job({title:'Title1', link:'https://www.google1.com.ar', ubicacion: 'Argentina1 - C.A.B.A.', fecha:'Hace 1 día' })
        const job2 = new Job({title:'Title2', link:'https://www.google2.com.ar', ubicacion: 'Argentina2 - C.A.B.A.', fecha:'Hace 2 días' })
        const empleos = [job1, job2]
        const history = new History({
            portal: 'PortalTest',
            resultados: empleos.length,
            empleos
        })
        const historyDB = await history.save()
        console.log(historyDB)
    } catch (error) {
        res.send('Error en el servidor')
    }
    res.send('Se guardo un historial')
})

// dominio:port/api/v1/jobs?keywords=node
app.post('/api/v1/jobs', async (req, res) => {
    const { keywords } = req.query
    if(!keywords) return res.send('Tiene que enviar un keywords como query')
    
    try {
        const connect = await connectDb()
        const jobs = await findBojs(keywords)
        const history = new History({
            keywords,
            portales: jobs
        })
        const historyDB = await history.save()
        
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor'})
    }
})


module.exports = app