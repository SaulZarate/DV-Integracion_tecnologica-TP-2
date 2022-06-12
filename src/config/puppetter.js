const OPEN_BROWSER = true
const WAIT_UNTIL = 'networkidle2'

const BROWSER_OPTIONS = {
    headless: !OPEN_BROWSER,
    timeout: 30000
}

const TAB_WAIT_2_REQUEST = {
    waitUntil: WAIT_UNTIL
}

module.exports = { BROWSER_OPTIONS, TAB_WAIT_2_REQUEST }