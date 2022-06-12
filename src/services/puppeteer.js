const puppeteer = require('puppeteer')
const { BROWSER_OPTIONS } = require('../config/puppetter')
const { getJobsCompuTrabajo } = require('../scrappers/computrabajo.scraping')

/* 
const iPhone = puppeteer.devices['iPhone 6'];
await page.emulate(iPhone); 
// https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
*/

const initPuppetter = async () => {
    const browser = await puppeteer.launch(BROWSER_OPTIONS)

    await getJobsCompuTrabajo(browser, 'backendasdasd')

    //await browser.close()
}


module.exports = initPuppetter