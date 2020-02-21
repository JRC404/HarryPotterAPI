const request = require('request');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config()

const getHarryPotterData = () => {
    request({
            uri: `https://www.potterapi.com/v1/characters?key=${process.env.key}`,
            json: true
        }, (err, res) => {
            if (err) throw err;
            console.log(res.body);

        })
}

getHarryPotterData()