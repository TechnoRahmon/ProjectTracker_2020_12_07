const mongoose = require("mongoose");


const Schema = mongoose.Schema; 


const projectSchema = new  Schema({
  
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: [300, "char shoude be 300"] },
  tasks : [{_id : {type:Schema.Types.ObjectId , requierd:true, ref:'Tasks'}}],
  created_at: { type: Date, default: Date.now },


});


module.exports = mongoose.model("Project", projectSchema);
