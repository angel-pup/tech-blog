const sequelize = require('../config/connection');
const { User, Note } = require('../models');

const userData = require('./userData.json');
const noteData = require('./noteData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Note.bulkCreate(noteData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedDatabase();
