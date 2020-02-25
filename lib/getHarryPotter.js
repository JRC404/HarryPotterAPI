const request = require('request');
const {
    promisify
} = require('util');

// require('dotenv').config();

const promisifiedRequest = promisify(request);


const getAllTheData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/characters/?key=${process.env.key}`,
        json: false
    })
    return data.body;
};

const getCharacterData = async (character) => {
    let data = await promisifiedRequest({
        // uri: `https://www.potterapi.com/v1/characters/${character}?key=${process.env.key}`,
        uri: `https://www.potterapi.com/v1/characters/?name=${character}&key=${process.env.key}`,
        json: true
    })
    return data.body;
};

const getHouseData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/houses/?key=${process.env.key}`,
        json: true
    })
    return data.body;
};

const getSpellData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/spells/?key=${process.env.key}`,
        json: true
    })
    return data.body;
};

const getSortingHatData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/sortingHat/?key=${process.env.key}`,
        json: true
    })
    return data.body;
}

module.exports = {
    getAllTheData,
    getCharacterData,
    getHouseData,
    getSpellData,
    getSortingHatData
}