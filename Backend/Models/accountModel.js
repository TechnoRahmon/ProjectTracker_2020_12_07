const mongoose = require("mongoose");

const Schema = mongoose.Schema; 


const accountSchema = new Schema({


  name: { type: String, required: true, unique:[true,'This name is already exist'] },
  users: [{ _id : {type:Schema.Types.ObjectId ,  ref:'Users '} }],
  projects : [{ _id: { type:Schema.Types.ObjectId ,  ref:'Projects ' }}],


});

module.exports = mongoose.model("Accounts", accountSchema);
