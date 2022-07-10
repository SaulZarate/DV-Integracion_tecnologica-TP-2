const { TAB_WAIT_2_REQUEST } = require("../config/puppetter")
const { replaceSpace } = require('./utils')

const BASE_URL = 'https://www.buscojobs.com.ar/ofertas/'
const END_URL = '_'

const getJobsBuscojobs = async (browser, keywords) => {
    const cleanKeywords = replaceSpace(keywords)
    
    const page = await browser.newPage()
    await page.goto(BASE_URL+cleanKeywords+END_URL, TAB_WAIT_2_REQUEST)

    // Handle tag body
    const handleTagBody = (await page.$x('//body'))[0]

    const result = await handleTagBody.evaluate( body => {

        let jobs = []

        
        /* const empleos = body.querySelectorAll('div.infinite-scroll-component__outerdiv div div > article')
        if(empleos.length == 0) return jobs

        for (let i = 0; i < empleos.length; i++) {
            if(i==15) break // Limitar los resultados a 15 empleos
            
            const tagTitle = empleos[i].querySelector('h2 a')
            const title = tagTitle.textContent
            const link = tagTitle.href
            const empresa = empleos[i].querySelector('p').textContent
            const [tagUbicacion, tagFecha] = empleos[i].querySelectorAll('svg + div')
            const ubicacion = tagUbicacion.textContent
            const fecha = tagFecha.textContent

            jobs.push({title,link,empresa,ubicacion,fecha})
        } */

        return jobs
    })

    await page.close()
    return result
}

module.exports = getJobsBuscojobs