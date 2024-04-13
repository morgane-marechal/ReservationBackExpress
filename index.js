const express = require('express')
const app = express()
const portExpress = 3001
const Hello = require('./place.js');
const Database = require('./database.js');
const { Client } = require('pg') 
const cors = require('cors');
require('dotenv').config();

app.use(cors()); //necessaire pour communiquer avec react

// routes pour appeler les différentes données
app.get('/', (req, res) => {
  // const hi = new Hello;
  // const hello = hi.greeting();
  // const calc = hi.calculer(3, 56)
  // res.send(hello + calc)

})

app.listen(portExpress, () => {
  console.log(`Example app listening on port ${portExpress}`)
})



  app.get('/testBdd', async function(req, res) {
    try {
      const bdd = new Database
      let dataEmail = await bdd.getUsersById(2);
      console.log(dataEmail); // Logging the fetched data
      res.send(dataEmail);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });

//requete pour les reservations
  app.get('/listeReservations', async function(req, res) {
    try {
      const bdd = new Database
      let dataReservations = await bdd.listeReservations();
      // let dataReservations = await bdd.getReservationsByTime('2023-04-08','12:30:00');
      console.log(dataReservations); 
      res.send(dataReservations);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });

  app.get('/listeReservationsByDate', async function(req, res) {
    try {
      const bdd = new Database
      let date = '2023-04-08';
      let dataReservations = await bdd.getReservationsByDate(date);
      // let dataReservations = await bdd.getReservationsByTime('2023-04-08','12:30:00');
      console.log(dataReservations); 
      res.send(dataReservations);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });

  app.get('/createUser', async function(req, res) {
    const newUser = {
      email: "hackdusiecle@proton.net",
      password: "securepassword"
    };
    try {
      const bdd = new Database
      let dataEmail = await bdd.insertUser(newUser);
      console.log(dataEmail); // Logging the fetched data
      res.send(dataEmail);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });

  app.get('/createReservation', async function(req, res) {
    const newReservation = {
      email: "hackdusiecle@proton.net",
      name: 'Jack Toulemonde',
      table_id : 1,
      customernumber:6,
      date:'2023-05-05',
      time:'12:30:00'
    };
    try {
      const bdd = new Database
      let resa = await bdd.insertReservation(newReservation);
      console.log(resa); // Logging the fetched data
      res.send(resa);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });


app.get('/data', function(req, res) {
    const data = [
        { 
        make: "Ford",
        model: "Mustang",
        year: 1969
      },
      { 
        make: "Toyota",
        model: "Subaru",
        year: 1990
      }
    ]
    res.send(
        data
    );
  });