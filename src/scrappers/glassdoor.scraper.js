const { TAB_WAIT_2_REQUEST, TAB_WAIT_2_REQUEST_DOMCONTENTLOAD } = require("../config/puppetter")
const { replaceSpace } = require("./utils")

const URL_JOBS = 'https://www.glassdoor.com.ar/Empleo/'
const URL_END ='-empleos-SRCH_KO0,7.htm?fromAge=30'

const getJobsGlassdoor = async (browser, keywords) => {
    const cleanKeywords = replaceSpace(keywords)
    const page = await browser.newPage()
    await page.goto(URL_JOBS+cleanKeywords+URL_END, TAB_WAIT_2_REQUEST_DOMCONTENTLOAD)

    const handleBody = (await page.$x('//body'))[0]

    const result = await handleBody.evaluate( body => {
        let jobs = []

        const empleos = body.querySelectorAll('article#MainCol ul > li.react-job-listing')
        if(empleos.length == 0) return jobs

        for (const empleo of empleos) {
            const contentData = empleo.lastElementChild
            const [tagEmpresa, tagTitle] = contentData.querySelectorAll('a.jobLink')
            const title = tagTitle.textContent
            const link = tagTitle.href
            const empresa = tagEmpresa.textContent
            const fecha = 'Hace ' + contentData.querySelector('div[data-test="job-age"]').textContent
            const tagsSpan = contentData.querySelectorAll('span')
            const ubicacion = tagsSpan[tagsSpan.length-1].textContent
            jobs.push({title, link, empresa, ubicacion, fecha})
        }  

        return jobs
    })

    await page.close()
    return result
}


module.exports = getJobsGlassdoor