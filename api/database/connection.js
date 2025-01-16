const path = require('path');

const file = path.join(__dirname, '/users');

const knex = require('knex')({
  client: 'sqlite3',

  connection: {
    filename: file,
  },
  useNullAsDefault: true,
});

exports.knex = knex;
