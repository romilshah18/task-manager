const { Model } = require('objection');
const Knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

// Create a new Knex instance
const knex = Knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST, // Set the host for the database connection
    port: process.env.DB_PORT, // Set the port for the database connection
    user: process.env.DB_USER, // Set the username for the database connection
    password: process.env.DB_PASSWORD, // Set the password for the database connection
    database: process.env.DB_NAME // Set the database name for the connection
  }
});

Model.knex(knex);

module.exports = knex;