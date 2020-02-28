const request = require('request');
const hbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const fs = require('fs');
const HarryPotterData = require('./lib/getHarryPotter')
// const HouseFunction = require('./lib/HouseFunction')
const app = express();
require('dotenv').config();

// MongoDB
// requiring Mongoose to use with MongoDB
const mongoose = require('mongoose');
// requiring the schema created in user.js. This currently holds name, email & password.
const UserSchema = require('./models/user');
// connection to the MongoDB Atlas cluster. Password stored in .env and useUnifiedTopology fixes warning given without.
mongoose.connect(`mongodb+srv://admin:${process.env.password}@usersignup-0cehi.mongodb.net/userdb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// create a user - hardcode.
// const user = new UserSchema({
//     name: 'dean',
//     email: 'dean@dean.com',
//     password: 'password'
// })

// user.save();

// finding all users - https://mongoosejs.com/docs/queries.html will assist with this.
// UserSchema.find({}, (err, docs) => {
//     console.log(docs);
// })


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
    // let name = data.name;
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
    // encodeURIComponent allows spaces for character names

    console.log(characterChoice)

    let data = await HarryPotterData.getCharacterData(characterChoice)
    // fs.writeFileSync('./JsonFiles/ReturnedInfo.json', data)
    // console.log(data)

    if (data[0]) {
        let name = data[0].name;
        let house = data[0].house;
        let boggart = data[0].boggart;
        let role = data[0].role;
        let wand = data[0].wand;
        let school = data[0].school;

        if (data[0].house == "Gryffindor") {
            console.log("Hello, Gryffindor");
        }


        res.render('characters', {
            data: {
                name,
                house,
                boggart,
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
    let input = req.body.houses
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

    for (const house of houses) {
        if (house.name == input) {
            res.render('houses', {
                house
            })
            return
        }
    }


    res.render('houses', {
        err: 'Error.'
    })



})

app.get('/spells', async (req, res) => {
    res.render('spells')
    // let data = await HarryPotterData.getSpellData();
    // fs.writeFileSync('./JsonFiles/spellData.json', data)
    // console.log(data);
})

app.post('/spells', async (req, res) => {
    let input = encodeURIComponent(req.body.spells);
    console.log(input)
    let data = await HarryPotterData.getSpellData(input);

    let spells = [];

    for (const item of data) {
        spells.push({
            spell: item.spell,
            type: item.type,
            effect: item.effect
        });
    }

    for (const spell of spells) {
        if (spell.spell == input) {
            res.render('spells', {
                spell
            });
            return;
        }
    }

    res.render('spells', {
        err: 'Nothing found.'
    });
});

app.get('/sortinghat', async (req, res) => {
    let house = await HarryPotterData.getSortingHatData();
    // fs.writeFileSync('./JsonFiles/sortingHat.json', data)
    // console.log(data);
    res.render('sortinghat', {
        house,
        title: `You have been sorted into: ${house}`
    });

    // res.render('sortinghat', {
    //     house
    // });
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/signup', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    UserSchema.findOne({
        email
    }, function (err, user) {
        if (err) {
            console.log('Error.')
        }

        if (user) {
            let err = new Error(`${email}A user with that email has already registered.`)
            err.status = 400;
            console.log(err)
            res.render('signup', {
                errorMessage: `${email} already taken. A user with that email has already registered.`
            })
            return;
        }
        res.render('account', {
            name,
            title: 'Your Profile'
        });
    })

    const user = new UserSchema({
        name: name,
        email: email,
        password: password
    });
    user.save();

});

app.listen(3001, () => {
    console.log('server listening on port 3001');
    // console.log(__dirname); // not necessary but kept for reference.
});