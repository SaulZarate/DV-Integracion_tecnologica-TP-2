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

        empleos.push({portal: 'Glassdoor', resultados: glassdoor.length ,empleos: glassdoor})
        empleos.push({portal: 'ZonaJobs', resultados: zonaJobs.length ,empleos: zonaJobs})
    }


    empleos.push({portal: 'Computrabajo', resultados: compuTrabajo.length, empleos: compuTrabajo})
    empleos.push({portal: 'Indeed', resultados: indeed.length, empleos: indeed})
    empleos.push({portal: 'Jooble', resultados:jooble.length, empleos:jooble})
    
    
    await browser.close()
    return empleos
}


module.exports = findBojs