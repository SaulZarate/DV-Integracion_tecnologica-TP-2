const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS } = require('../config/puppetter')
const getJobsCompuTrabajo = require('../scrappers/computrabajo.scraping')
const getJobsIndeed = require('../scrappers/indeed.scraping')
const getJobsZonaJobs = require('../scrappers/zonajobs.scrapin')


const keywords = 'backend'

const initPuppetter = async () => {
    const startTime = performance.now()/1000
    const browser = await puppeteer.launch(BROWSER_OPTIONS)
    
    
    // await getJobsCompuTrabajo(browser, keywords)
    /* 
    // Problemas al ejecutarlo sin la visualización del navegador
    await getJobsZonaJobs(browser, keywords) 
    */
    // await getJobsIndeed(browser, keywords)
    
    await browser.close()
    const endTime = performance.now()/1000
    console.log('Time in seconds: ', (endTime - startTime))
    
}


module.exports = initPuppetter