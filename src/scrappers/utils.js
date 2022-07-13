const replaceSpace = (str, replaceBy = '-') => {
    return str.trim().replace(' ',replaceBy)
}


module.exports = { replaceSpace }