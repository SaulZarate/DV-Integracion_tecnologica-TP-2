const app = require("./express");
const findBojs = require("./puppeteer");

const initProyect = () => {
    
    //findBojs
    
    app.listen(app.get('port') , () => {
        console.log('> Server is up and running on port: ' + app.get('port'))
    })
    
}

module.exports = initProyect