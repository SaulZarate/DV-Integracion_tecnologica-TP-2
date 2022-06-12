const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS } = require('../config/puppetter')
const getJobsCompuTrabajo = require('../scrappers/computrabajo.scraping')
const getJobsZonaJobs = require('../scrappers/zonajobs.scrapin')

/* 
const iPhone = puppeteer.devices['iPhone 6'];
await page.emulate(iPhone); 
// https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
*/

const keywords = 'backend'

const initPuppetter = async () => {
    const startTime = performance.now()
    const browser = await puppeteer.launch(BROWSER_OPTIONS)
    
    
    //await getJobsCompuTrabajo(browser, keywords)
    await getJobsZonaJobs(browser, keywords)
    
    
    await browser.close()
    const endTime = performance.now()
    console.log('Time: ', (endTime - startTime))
    
}


module.exports = initPuppetter