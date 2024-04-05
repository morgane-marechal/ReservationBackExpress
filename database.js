// const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            host: 'localhost',
            user: 'app',
            password: 'password',
            port: 5433,
        });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

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

            const res = await this.client.query(`SELECT * FROM users WHERE id = ${id}`);
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

    async getUsersByEmail(email) {
        try {
            await this.client.connect();
            const res = await this.client.query(`SSELECT * FROM users WHERE id = ${email}`);
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
}

module.exports = Database;