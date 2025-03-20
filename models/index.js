const { sequelize, connectDB } = require('../config/database'); // Import database connection
const User = require('./user'); // Import the User model

const syncDatabase = async () => {
  try {
    await connectDB(); // Ensure database connection
    console.log('Database connected...');

    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log('All models synced successfully.');

    process.exit(); // Exit after syncing
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1); // Exit with an error code
  }
};

syncDatabase();
