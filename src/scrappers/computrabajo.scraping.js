const { replaceSpace } = require("./utils")

const URL_SEARCH_JOB = 'https://www.computrabajo.com.ar/trabajo-de-'

const getJobsCompuTrabajo = async (browser, keywords) => {
    const formatKeyword = replaceSpace(keywords)
    const page = await browser.newPage()
    await page.goto(URL_SEARCH_JOB+formatKeyword)

    // Validar que haya resultados
    const handleTagBody = (await page.$x('//body'))[0]

    const result = await handleTagBody.evaluate( body => {
        let jobs = []

        const contentH1 = body.querySelector('h1').textContent
        if(contentH1.includes('No se ha encontrado ofertas de trabajo con los filtros actuales')) return jobs

        const empleos  = body.querySelectorAll('#p_ofertas article')

        for (let empleo of empleos) {
            const divData = empleo.firstElementChild

            const contentTitle = divData.querySelector('h1 a')
            const title = contentTitle.textContent
            const link = contentTitle.href

            const contentUbicacion = divData.querySelector('p').textContent
            const strInArray = contentUbicacion.split('\n\n')
            const ubicacion = strInArray[(strInArray.length - 1)].trim()
            
            const fecha = divData.lastElementChild.textContent.trim()
            jobs.push({ title, link, ubicacion, fecha })
        }

        return jobs
    }) // End evaluate

    console.log(result)
}


module.exports = { getJobsCompuTrabajo }