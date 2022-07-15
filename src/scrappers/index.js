const getJobsBumeran = require('./bumeran.scraper')
const getJobsBuscojobs = require('./buscojobs.scraper')
const getJobsCompuTrabajo = require('./computrabajo.scraper')
const getJobsGlassdoor = require('./glassdoor.scraper')
const getJobsIndeed = require('./indeed.scraper')
const getJobsJooble = require('./jooble.scraper')
const getJobsZonaJobs = require('./zonajobs.scraper')


module.exports = {
    getJobsBumeran,
    getJobsBuscojobs,
    getJobsCompuTrabajo,
    getJobsGlassdoor,
    getJobsIndeed,
    getJobsJooble,
    getJobsZonaJobs
}