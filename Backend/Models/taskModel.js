const mongoose = require('mongoose');

const Schema = mongoose.Schema; 
const get_date = (date)=>{
      
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



const taskSchma = new Schema({

    name:{type: String, required: true},

    owners:[{ _id :{ type: Schema.Types.ObjectId, ref:"Users"} }], // ref to users model

    comments:[{ user_id :{ type: Schema.Types.ObjectId, ref:"Users"},
                content:{type: String ,maxlength: [300, "Content Should Be Maximum 300 Words Only"]},
                created_at:{type: Date }}],

    account_id:{  type: Schema.Types.ObjectId, ref:"Accounts", required: true },// ref to account  model

    project_id:{  type: Schema.Types.ObjectId, ref:"Projects", required: true },// ref to projects  model

    status : { type:Number , require:true, default:0, enum:[0,25,50,75,100]},
    
    // default start date is date.now .
    start_date: { type: Date, default: ()=>get_date(new Date()) , required: true, min:()=>get_date(new Date()), max:this.end_date },
    // default end date is after 1 day from start date.
    end_date: { type: Date, default: ()=>get_date(new Date(Date.now()+1000*60*60*24)), required: true , min:this.start_date }

}) 
 
const Task = module.exports = mongoose.model("Tasks", taskSchma);


module.exports.getDate = get_date