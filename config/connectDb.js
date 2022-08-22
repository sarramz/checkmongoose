//install and set up mongoose
const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
    console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log("db is successfuly connected");
  } catch (error) {
    console.log("connection to db is failed ");
  }
};
module.exports=connectDb