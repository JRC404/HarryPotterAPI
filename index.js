const request = require('request');
const hbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config()

const HarryPotterData = require('./lib/getHarryPotter')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
    // let data = await HarryPotterData.getAllTheData();
    // console.log(data)
    // fs.writeFileSync('./JsonFiles/HarryPotter.json', data)
    // let name = data[0].name;
    // let house = data[0].house;
    // console.log(name);
    // console.log(house);

    res.render('index');
});

app.get('/characters', (req, res) => {
    res.render('characters')
})

app.post('/characters', async (req, res) => {
    let characterChoice = encodeURIComponent(req.body.character)

    console.log(characterChoice)

    let data = await HarryPotterData.getCharacterData(characterChoice)
    fs.writeFileSync('./JsonFiles/ReturnedInfo.json', data)
    console.log(data)

    if (data[0]) {
        let name = data[0].name;
        let house = data[0].house;
        let role = data[0].role;
        let wand = data[0].wand;
        let school = data[0].school;

        res.render('characters', {
            data: {
                name,
                house,
                role,
                wand,
                school
            }
        })
        return
    }

    res.render('characters', {
        err: 'nothing found'
    })
})

app.get('/houses', async (req, res) => {

    res.render('houses')
})

app.post('/houses', async (req, res) => {
    let data = await HarryPotterData.getHouseData();
    // fs.writeFileSync('./JsonFiles/houseData.json', data)

    let houses = []
    /*
    
    if item.name == Gryffindor then return the object information on Gryffindor 
    the reason for this, to allow the user to choose which house information they'd like to display.

    */
    for (const item of data) {
        houses.push({
            name: item.name,
            mascot: item.mascot,
            headOfHouse: item.headOfHouse,
            founder: item.founder
        })
    }

    console.log(houses);


    res.render('houses', {
        houses
    })
})

app.listen(3001, () => {
    console.log('server listening on port 3001');
    console.log(__dirname);
});