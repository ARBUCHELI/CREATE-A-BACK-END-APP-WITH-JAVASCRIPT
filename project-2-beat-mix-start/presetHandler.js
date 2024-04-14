// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (request, index, newPresetArray) => {
    let returnedArray = [];
    let isValidIndex = index >= 0 && index < 16;
    let isValidMethod = request === 'GET' || request === 'PUT';

    if (!isValidIndex) {
        returnedArray = [404];
    } else {
        if (request === 'GET') {
            returnedArray = [200, presets[index]];
        } else if (request === 'PUT') {
            presets[index] = newPresetArray;
            returnedArray = [200, presets[index]];
        }
    }

    if (!isValidMethod) {
        returnedArray = [400];
    }

    return returnedArray;
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
