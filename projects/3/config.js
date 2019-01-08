const dotenv = require("dotenv");
 const path = require("path");

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root("") });


module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL||'mongodb://localhost/mydb',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};