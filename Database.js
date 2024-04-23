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
  
}

module.exports = Database;