const { TAB_WAIT_2_REQUEST } = require("../config/puppetter")
const { replaceSpace } = require("./utils")


const URL_SEARCH_JOB = 'https://www.zonajobs.com.ar/ofertas-de-trabajo-'


const getJobsZonaJobs = async(browser, keywords) => {

    const formatKeyword = replaceSpace(keywords)
    const page = await browser.newPage()
    await page.goto(URL_SEARCH_JOB + formatKeyword + '.html', TAB_WAIT_2_REQUEST)

    // Handle tag body
    const handleTagBody = (await page.$x('//body'))[0]

    const result  = await handleTagBody.evaluate( body  => {
        const URL_BASE = 'https://www.zonajobs.com.ar'
        let jobs = []
        
        if(body.querySelector('h1 strong').textContent === '0') return jobs

        const cleanString = str => str.replaceAll('\n', '').replace(',','').trim()

        const empleos = body.querySelectorAll('div.aviso-no-sponsor div.aviso')
        
        for (const empleo of empleos) {
            
            const titlesH3 = empleo.querySelectorAll('h3')
            const title = empleo.querySelector('h2').textContent
            const empresa = cleanString(titlesH3[0].textContent)
            const ubicacion = cleanString(titlesH3[1].textContent) + ', ' + cleanString(titlesH3[2].textContent)
            const fecha = empleo.querySelectorAll('span.z-fecha')[0].textContent
            const link = empleo.classList.contains('aviso-de-bumeran') ? empleo.id : `${URL_BASE}${(empleo.id)}`

            jobs.push({title, empresa, ubicacion, fecha, link}) 
        }

        return jobs
    }) // End evaluate

    await page.close()
    return result
}

module.exports = getJobsZonaJobs