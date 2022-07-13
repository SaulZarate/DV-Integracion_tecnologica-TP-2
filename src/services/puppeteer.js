const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS, OPEN_BROWSER } = require('../config/puppetter')
const getJobsBumeran = require('../scrappers/bumeran.scraper')
const getJobsBuscojobs = require('../scrappers/buscojobs.scraper')
const getJobsCompuTrabajo = require('../scrappers/computrabajo.scraper')
const getJobsGlassdoor = require('../scrappers/glassdoor.scraper')
const getJobsIndeed = require('../scrappers/indeed.scraper')
const getJobsJooble = require('../scrappers/jooble.scraper')
const getJobsZonaJobs = require('../scrappers/zonajobs.scraper')


const keywords = 'node js'

const initPuppetter = async () => {
    const startTime = performance.now()/1000
    const browser = await puppeteer.launch(BROWSER_OPTIONS)
    
    let empleos = []

    
    const promiseCompuTrabajo = getJobsCompuTrabajo(browser, keywords)
    const promiseIndeed = getJobsIndeed(browser, keywords)
    const promiseJooble = getJobsJooble(browser, keywords)
    
    const compuTrabajo = await promiseCompuTrabajo
    const indeed = await promiseIndeed
    const jooble = await promiseJooble


    // Solo funciona cuando se usa el modo open_browser = true en config/puppeteer
    // Acceso denegado | Error code 1020
    if(OPEN_BROWSER){
        const promiseZonaJobs = getJobsZonaJobs(browser, keywords) 

        const promiseGlassdoor = getJobsGlassdoor(browser, keywords)
        const glassdoor = await promiseGlassdoor
        const zonaJobs = await promiseZonaJobs

        empleos.push({portal: 'Glassdoor', resultados: glassdoor.length ,empleos: glassdoor})
        empleos.push({portal: 'ZonaJobs', resultados: zonaJobs.length ,empleos: zonaJobs})
    }


    empleos.push({portal: 'Computrabajo', resultados: compuTrabajo.length, empleos: compuTrabajo})
    empleos.push({portal: 'Indeed', resultados: indeed.length, empleos: indeed})
    empleos.push({portal: 'Jooble', resultados:jooble.length, empleos:jooble})
    
    
    await browser.close()
    const endTime = performance.now()/1000
    console.log('Time in seconds: ', (endTime - startTime))
    
    return empleos
}


module.exports = initPuppetter