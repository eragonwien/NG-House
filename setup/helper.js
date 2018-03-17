/**
 * returns a list of strings
 * @param {string} str string contains items separated by comma
 * @returns {string[]} list of strings
 */
function getListFromString(str) {
    var list = [];
    var lastIndex = -1;
    for (let i = 0; i < str.length; i++) {
        if (lastIndex == -1) {
            lastIndex = i;
        }
        if (str.charAt(i) == ',') {
            var item = str.substring(lastIndex, i);
            lastIndex = -1;
            if (item != '') {
                list.push(item);
            }
            continue;
        }
        if (i == (str.length - 1) && lastIndex != -1) {
            var item = str.substring(lastIndex, str.length);
            if (item != '') {
                list.push(item);  
            }          
        }
    }
    return list;
}
exports.getListFromString = getListFromString;

/**
 * returns a integer between the min and max values
 * @param {number} min min value
 * @param {number} max max value
 * @returns {number} a random integer
 */
function getRandomInt(min, max) {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.floor((Math.random() * max) + min);
}
exports.getRandomInt = getRandomInt;