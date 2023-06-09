const mongoose = require("mongoose");

const db = async()=>{
  try{
      const connection = await mongoose.connect("mongodb://localhost:27017/Mobigic" ,{
          useNewUrlParser:true,
          useUnifiedTopology:true
      });
      console.log(`MongoDb Connected SuccessfullY : ${connection.connection.host} `);
  }catch (error){
          console.log('=========>',error);
  }
}
module.exports = db;