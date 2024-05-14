const { Client } = require('pg');
require('dotenv').config();
const Database = require('./Database');

class Reservation extends Database {
    constructor() {
        super();
    }


    async  listeReservations(){

        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM reservations`);
            console.log(res.rows);
            await this.client.end();
            return res.rows;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }


async getReservationsByDate(date) {
    try {
        await this.connect();
        const res = await this.client.query('SELECT * FROM reservations WHERE reserveddate = $1', [date]);
        const reservations = res.rows;
        await this.client.end();
        return reservations;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }finally {
        await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
    }
}

async getReservationByEmail(email){
    try {
        await this.connect();
        const res = await this.client.query('SELECT * FROM reservations WHERE email = $1', [email]);
        const reservations = res.rows;
        await this.client.end();
        return reservations;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }finally {
        await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
    }
}

async getReservationsByTime(date, time) {
    try {
        await this.connect();
        const res = await this.client.query('SELECT * FROM reservations WHERE reserveddate = $1 AND reservedtime = $2', [date, time]);
        const reservations = res.rows;
        await this.client.end();
        return reservations;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

async getBookedTablesAtThisTime(date, time) {
    try {
        await this.connect();
        const res = await this.client.query('SELECT SUM(customernumber) AS sum_customer FROM reservations WHERE reserveddate = $1 AND reservedtime = $2', [date, time]);
        const reservations = res.rows;
        await this.client.end();
        return reservations;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

async  insertReservation(newResa) {
    try {
        await this.connect();
  
        const { email, name, customernumber,date, time } = newResa
  
        const query = `
            INSERT INTO reservations (email, name, customernumber, reserveddate, reservedtime)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
  
        const values = [email, name, customernumber,date, time];
        const res = await this.client.query(query, values);
  
        console.log('Reservation inserted:', res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error('Error inserting reservation:', error);
        throw error;
    } finally {
        await this.disconnect(); 
    }
  }

  
}

module.exports = Reservation;