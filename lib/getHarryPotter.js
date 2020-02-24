const request = require('request');
const {
    promisify
} = require('util');

require('dotenv').config();

const promisifiedRequest = promisify(request);


const getAllTheData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/characters/?key=${process.env.key}`,
        json: false
    })
    return data.body;
};

const getHarryPotterData = async (character) => {
    let data = await promisifiedRequest({
        // uri: `https://www.potterapi.com/v1/characters/${character}?key=${process.env.key}`,
        uri: `https://www.potterapi.com/v1/characters/?name=${character}&key=${process.env.key}`,
        json: false
    })
    return data.body;
};

module.exports = {
    getHarryPotterData,
    getAllTheData
}