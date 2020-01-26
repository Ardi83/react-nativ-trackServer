require('dotenv').config();

module.exports = {
  mongoURL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}/test?retryWrites=true&w=majority`,
  jwtSecret: `${process.env.JWT_SECRET_KEY}`
}