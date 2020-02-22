const request = require('request');
const hbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config()

const getHarryPotterData = require('./lib/getHarryPotter')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
    let data = await getHarryPotterData();
    // console.log(data)
    fs.writeFileSync('HarryPotter.json', data)
    let name = data.name;
    let house = data.house;
    console.log(name);
    console.log(house);
    
    res.render('index');
});

app.get('/characters', (req, res)=> {
    res.render('characters')
})

app.get('/houses', (req, res)=> {
    res.render('houses')
})

app.listen(3001, () => {
    console.log('server listening on port 3000');
    console.log(__dirname);
});