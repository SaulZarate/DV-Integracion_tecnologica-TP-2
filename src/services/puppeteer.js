const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS } = require('../config/puppetter')
const getJobsBumeran = require('../scrappers/bumeran.scraper')
const getJobsCompuTrabajo = require('../scrappers/computrabajo.scraper')
const getJobsIndeed = require('../scrappers/indeed.scraper')
const getJobsZonaJobs = require('../scrappers/zonajobs.scraper')


const keywords = 'node'

const initPuppetter = async () => {
    const startTime = performance.now()/1000
    const browser = await puppeteer.launch(BROWSER_OPTIONS)
    
    
    /* 
    // Problemas al ejecutarlo sin la visualización del navegador
    */
    await getJobsZonaJobs(browser, keywords) 
    await getJobsCompuTrabajo(browser, keywords)
    await getJobsIndeed(browser, keywords)
    
    /* 
    // El metodo evaluate del handleBody devuelve undefined
    await getJobsBumeran(browser, keywords)
    */
    
    await browser.close()
    const endTime = performance.now()/1000
    console.log('Time in seconds: ', (endTime - startTime))
    
}


module.exports = initPuppetter