const mongoose = require('mongoose');
// process.env.DB_MONGO

const connectdb = () => {
  try {
    mongoose
      .connect(`${process.env.MONGODB_URI}`, {
        // useCreatendex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((dbm) => console.log(`{:DB:} Connected ready - ${dbm.connection.host}`));
  } catch (error) {
    console.log('{:DB:} Error', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
