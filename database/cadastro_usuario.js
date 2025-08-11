const sequelize = require('sequelize');
const connection = require('../database/conection');

const usuario = connection.define('usuarios', {
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: sequelize.STRING,
    allowNull: false,
  },
  senha_2: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

//usuario.sync({ force: false }).then(() => {});

module.exports = usuario;
