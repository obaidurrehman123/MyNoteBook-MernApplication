const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoUrl = "mongodb://localhost:27017/iNoteBook";
module.exports =  ()=> {
 try{
  mongoose.connect(mongoUrl, {useNewUrlParser: true});
  console.log("Db connected Successfully");
 }
 catch(error){
    console.log("Database Connectivity Error");
    throw new Error(error);
 }
}
