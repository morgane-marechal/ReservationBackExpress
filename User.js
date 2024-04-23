const { Client } = require('pg');
require('dotenv').config();
const Database = require('./Database');

class User extends Database {
    constructor() {
        super();
    }

    async getUsers() {
        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM users`);
            console.log(res.rows);
            const usersListe = res.rows;
            // await this.client.end();
            return usersListe;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }

    async getUserById(id) {
        try {
            await this.connect(); // Utiliser la méthode de connexion de la classe parente
            const res = await this.client.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = res.rows;
            return user;
        } catch (error) {
            console.error('Error fetching user data from database:', error);
            throw error;
        } finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }

    async getUsersByEmail(email) {
        try {
            await this.connect(); // Utiliser la méthode de connexion de la classe parente
            const res = await this.client.query('SELECT * FROM users WHERE id = $1', [email]);
            const user = res.rows;
            return user;
        } catch (error) {
            console.error('Error fetching user data from database:', error);
            throw error;
        } finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }


     
        async  insertUser(newUser) {
          try {
              await this.connect();
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
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
          }
        }
  
}

module.exports = User;