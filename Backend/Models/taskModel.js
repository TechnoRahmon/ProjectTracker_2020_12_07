const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const taskSchma = new Schema({

    name:{type: String, required: true},
    owners:[{ _id :{ type: Schema.Types.ObjectId, ref:"Users"} }], // ref to users model
    comments:[{ _id :{ type: Schema.Types.ObjectId, ref:"Comments"} }],// ref to comments  model
    project_id:{  type: Schema.Types.ObjectId, ref:"Projects", required: true },// ref to projects  model
    start_date: { type: Date, default: ()=>new Date() , required: true, min:Date.now('dec,12,2020') , max:end_date },
    end_date: { type: Date, default: ()=>new Date(), required: true , min:start_date }

}) 
 
const Task = module.exports = mongoose.model("Tasks", taskSchma);


