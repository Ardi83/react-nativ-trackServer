require('dotenv').config();

module.exports = {
  mongoURL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}/test?retryWrites=true&w=majority`
}
// mongodb+srv://ardashir:<password>@track-server-nykaq.mongodb.net/test?retryWrites=true&w=majority