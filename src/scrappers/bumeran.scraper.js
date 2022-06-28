const { TAB_WAIT_2_REQUEST } = require("../config/puppetter")
const { replaceSpace } = require("./utils")

const BASE_URL = 'https://www.bumeran.com.ar/'
const KEY_JOBS = 'empleos-busqueda-'
const END_URL = '.html'

const getJobsBumeran = async (browser, keywords) => {
    const cleanKeywords = replaceSpace(keywords)

    const URL = BASE_URL + KEY_JOBS + cleanKeywords + END_URL

    const page = await browser.newPage()
    await page.goto(URL, TAB_WAIT_2_REQUEST)

    // Handle tag body
    const handleBody = (await page.$x('//body'))[0]

    const result = await handleBody.evaluate( body => {
        let jobs = []

        const empleos = body.querySelectorAll('#listado-avisos > div')
        if(!empleos) return jobs

        for (const empleo of empleos) {
            if(!empleo.querySelector('h2')) continue

            const link = empleo.firstElementChild.href
            const contentData = empleo.firstElementChild.firstElementChild
            const [empresa, fecha, ubicacion] = contentData.querySelectorAll('h3')
            const title = contentData.querySelector('h2').textContent
            
            jobs.push({title,empresa,ubicacion,fecha,link})
        }

        return jobs
    })

    console.log(result)
    await page.close()
    return result
}

module.exports = getJobsBumeran