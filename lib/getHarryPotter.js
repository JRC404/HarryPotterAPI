const request = require('request');
const {
    promisify
} = require('util');

require('dotenv').config();

const promisifiedRequest = promisify(request);


const getHarryPotterData = async (character) => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/characters/${character}?key=${process.env.key}`,
        json: true
    })
    return data.body;
};

module.exports = getHarryPotterData;