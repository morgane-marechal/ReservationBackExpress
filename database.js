const { Client } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
    }

    //gestion connection
    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log('Disconnected from database');
        } catch (error) {
            console.error('Error disconnecting from database:', error);
            throw error;
        }
    }


    //gestion utilisateurs
    async getUsers() {
        try {
            await this.client.connect();
            const res = await this.client.query(`SELECT * FROM users`);
            console.log(res);
            console.log(res.rows);
            const email = res.rows;
            await this.client.end();
            return email;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async getUsersById(id) {
        try {
            await this.client.connect();
            const res = await this.client.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = res.rows;
            await this.client.end();
            return user;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async getUsersByEmail(email) {
        try {
            await this.client.connect();
            const res = await this.client.query('SELECT * FROM users WHERE email = $1', [email]);
            console.log(res);
            console.log(res.rows);
            const email = res.rows;
            await this.client.end();
            return email;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async  listeUsers(){
        await this.client.connect();
        const res = await this.client.query(`SELECT * FROM users`);
        console.log(res.rows);
        await this.client.end();
        return res.rows;
        }
        


     
        async  insertUser(newUser) {
          try {
              await this.client.connect();
        
              const { email, password } = newUser;
        
              const query = `
                  INSERT INTO users (email, password)
                  VALUES ($1, $2)
                  RETURNING *;
              `;
        
              const values = [email, password];
              const res = await this.client.query(query, values);
        
              console.log('User inserted:', res.rows[0]);
              return res.rows[0];
          } catch (error) {
              console.error('Error inserting user:', error);
              throw error;
          } finally {
              await this.client.end();
          }
        }
        


        //______________________________________gestion reservations ______________________________________________
        async  listeReservations(){

            await this.client.connect();
            const res = await this.client.query(`SELECT * FROM reservations`);
            console.log(res.rows);
            await this.client.end();
            return res.rows;
            }


    async getReservationsByDate(date) {
        try {
            await this.client.connect();
            const res = await this.client.query('SELECT * FROM reservations WHERE reserveddate = $1', [date]);
            const reservations = res.rows;
            await this.client.end();
            return reservations;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async getReservationsByTime(date, time) {
        try {
            await this.client.connect();
            const res = await this.client.query('SELECT * FROM reservations WHERE reserveddate = $1 AND reservedtime = $2', [date, time]);
            const reservations = res.rows;
            await this.client.end();
            return reservations;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

//     SELECT nextval('reservations_id_seq');
// INSERT INTO reservations (email, name, table_id, customernumber, reserveddate, reservedtime)
//     VALUES ('hackdusiecle@proton.net', 'Jack toutlemonde', 1, 2, '2023-06-04', '12:30:00')

    async  insertReservation(newResa) {
        try {
            await this.client.connect();
      
            const { email, name,table_id,customernumber,date, time } = newResa
      
            const query = `
                INSERT INTO reservations (email, name, table_id, customernumber, reserveddate, reservedtime)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `;
      
            const values = [email, name,table_id,customernumber,date, time];
            const res = await this.client.query(query, values);
      
            console.log('Reservation inserted:', res.rows[0]);
            return res.rows[0];
        } catch (error) {
            console.error('Error inserting reservation:', error);
            throw error;
        } finally {
            await this.client.end();
        }
      }
  
}

module.exports = Database;