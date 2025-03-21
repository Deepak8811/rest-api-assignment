require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging (optional)
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);

// Test Database Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully!');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectDB };
