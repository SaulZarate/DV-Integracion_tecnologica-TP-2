const OPEN_BROWSER = true
const WAIT_UNTIL_0 = 'networkidle0'
const WAIT_UNTIL = 'networkidle2'
const ENABLE_TIMEOUT = false

const BROWSER_OPTIONS = {
    headless: !OPEN_BROWSER,
    timeout: 30000
}

const TAB_WAIT_2_REQUEST = {
    waitUntil: WAIT_UNTIL,
    timeout: ENABLE_TIMEOUT ? 30000 : 0
}

const TAB_WAIT_2_REQUEST_DOMCONTENTLOAD = {
    waitUntil: WAIT_UNTIL_0,
    timeout: ENABLE_TIMEOUT ? 30000 : 0
}

module.exports = { BROWSER_OPTIONS, TAB_WAIT_2_REQUEST, TAB_WAIT_2_REQUEST_DOMCONTENTLOAD, OPEN_BROWSER }