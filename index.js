const express = require('express')
const app = express()
const portExpress = 3001
const Hello = require('./place.js');
// const Database = require('./database.js');
const { Client } = require('pg') 


/*exemple de requêtes avec la bdd postgres
à transférer et répartir dans des classe database, users, et tables afin de les appeler dans les routes*/ 


//fonction pour liste utilisateurs
async function data(){
const client = new Client({
    host: 'localhost',
    user: 'app',
    password: 'password',
    port: 5433,
});
await client.connect();
const res = await client.query(`SELECT * FROM users`);
console.log(res);
console.log(res.rows);
email=res.rows;
await client.end();
return res.rows;
}

//fonction pour liste reservations
async function listeReservations(){
  const client = new Client({
      host: 'localhost',
      user: 'app',
      password: 'password',
      port: 5433,
  });
  await client.connect();
  const res = await client.query(`SELECT * FROM reservations`);
  console.log(res);
  console.log(res.rows);
  email=res.rows;
  await client.end();
  return res.rows;
  }



async function insertUser(newUser) {
  const client = new Client({
      host: 'localhost',
      user: 'app',
      password: 'password',
      port: 5433,
  });

  try {
      await client.connect();

      const { email, password } = newUser;

      const query = `
          INSERT INTO users (email, password)
          VALUES ($1, $2)
          RETURNING *;
      `;

      const values = [email, password];
      const res = await client.query(query, values);

      console.log('User inserted:', res.rows[0]);
      return res.rows[0];
  } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
  } finally {
      await client.end();
  }
}



// routes pour appeler les différentes données

app.get('/', (req, res) => {
  const hi = new Hello;
  const hello = hi.greeting();
  const calc = hi.calculer(3, 56)
// create();
  res.send(hello + calc)

})

app.listen(portExpress, () => {
  console.log(`Example app listening on port ${portExpress}`)
})


app.get('/profil', function(req, res) {
    res.send('hello profil');
  });

  app.get('/testBdd', async function(req, res) {
    try {
      let dataEmail = await data();
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
      let dataEmail = await listeReservations();
      console.log(dataEmail); // Logging the fetched data
      res.send(dataEmail);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
  }
  });

  app.get('/createUser', async function(req, res) {
    const newUser = {
      email: "john.doe@example.com",
      password: "securepassword"
    };
    try {
      let dataEmail = await insertUser(newUser);
      console.log(dataEmail); // Logging the fetched data
      res.send(dataEmail);
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