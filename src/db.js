const Sequelize = require('sequelize');
let dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  define: {
    timestaps: false,
  },
});
const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
sequelize
  .sync({ force: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

module.exports = sequelize;
