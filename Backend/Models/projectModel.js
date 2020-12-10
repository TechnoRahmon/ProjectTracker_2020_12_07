const mongoose = require("mongoose");


const Schema = mongoose.Schema; 


const projectSchema = new  Schema({
  
  name: { type: String, required: true,  },
  description: { type: String, required: true, maxlength: [300, "char shoude be 300"] },
  account_id:{type:Schema.Types.ObjectId , ref:'Accounts'},
  created_at: { type: Date, default: ()=>new Date },


});


const Project = module.exports = mongoose.model("Projects", projectSchema);

module.exports.getDate = (date)=>{
      
      const month= date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear(); 
      let fulldate =year;
      
      if (month<10 ) fulldate+=`-0${month+1}-`
        else fulldate+=`-${month+1}-`; 
      if(day<10) fulldate+=`0${day}`
        else fulldate+=`${day}`; 
      return fulldate;
}