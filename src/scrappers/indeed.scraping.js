const { TAB_WAIT_2_REQUEST } = require("../config/puppetter")

const BASE_URL = 'https://ar.indeed.com/'
const JOBS_COMPONENTE_URL = 'trabajo?q='
const COUNTRY_COMPONENTE_URL = '&l=Argentina'

const getJobsIndeed = async (browser, keywords) => {
    const cleanKeywords = keywords.trim()
    
    const page = await browser.newPage()
    await page.goto(BASE_URL+JOBS_COMPONENTE_URL+cleanKeywords+COUNTRY_COMPONENTE_URL, TAB_WAIT_2_REQUEST)

    // Handle tag body
    const handleTagBody = (await page.$x('//body'))[0]

    const result = await handleTagBody.evaluate( body => {

        let jobs = []

        const empleos = body.querySelectorAll('ul.jobsearch-ResultsList > li > div.cardOutline ')
        if(!empleos) return jobs

        for (const empleo of empleos) {
            if(!empleo) continue
            const [contentData, contentFecha] = empleo.querySelectorAll('table')
            const tagTitle = contentData.querySelector('h2 > a')
            
            const title = tagTitle.textContent
            const link = tagTitle.href
            const empresa = empleo.querySelector('div > span').textContent
            const fecha = contentFecha.querySelector('span.date').textContent
            const ubicacion = contentData.querySelector('div.companyLocation').textContent

            jobs.push({title, empresa, ubicacion, fecha, link})
        }

        return jobs
    })

    console.log(result)
}

module.exports = getJobsIndeed