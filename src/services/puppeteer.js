const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS, OPEN_BROWSER } = require('../config/puppetter')
const { 
    getJobsCompuTrabajo, 
    getJobsIndeed, 
    getJobsJooble, 
    getJobsZonaJobs, 
    getJobsGlassdoor, 
    getJobsBumeran,
    getJobsBuscojobs
} = require('../scrappers')


const findBojs = async (keywords) => {
    let empleos = []

    const browser = await puppeteer.launch(BROWSER_OPTIONS)
    
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

        empleos.push({portal: 'Glassdoor', total: glassdoor.length ,empleos: glassdoor})
        empleos.push({portal: 'ZonaJobs', total: zonaJobs.length ,empleos: zonaJobs})
    }


    empleos.push({portal: 'Computrabajo', total: compuTrabajo.length, empleos: compuTrabajo})
    empleos.push({portal: 'Indeed', total: indeed.length, empleos: indeed})
    empleos.push({portal: 'Jooble', total:jooble.length, empleos:jooble})
    
    
    await browser.close()
    return empleos
}


module.exports = findBojs