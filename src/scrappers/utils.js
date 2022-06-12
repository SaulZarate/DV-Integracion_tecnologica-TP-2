const replaceSpace = (str) => {
    return str.trim().replace(' ','-')
}

const clearStringUbicacion = (str) => {
    const strInArray = str.split('\n\n')
    return strInArray[strInArray.lenght - 1]
}

module.exports = { replaceSpace }