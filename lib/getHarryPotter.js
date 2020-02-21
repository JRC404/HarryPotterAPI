const request = require('request');
const {
    promisify
} = require('util');

require('dotenv').config();

const promisifiedRequest = promisify(request);


const getHarryPotterData = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/characters/?key=${process.env.key}`,
        json: false
    })
    return data.body;
};

module.exports = getHarryPotterData;