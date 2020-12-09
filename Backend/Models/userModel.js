const mongoose = require('mongoose')
require('mongoose-type-email')
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'; 
const Email = mongoose.SchemaTypes.Email; 

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    
    fullname:{type:String },
    email:{ type:Email , requierd:true , correctTld:true , trim:true },
    password: { type:String  },
    image_path: { type:String },
    account_id:{type:Schema.Types.ObjectId , ref:'Accounts'},
    user_type : { type:String , require:true, default:'AdminUser', enum:['ViwerUser','BasicUser','AdminUser']},
    verified:{type:Boolean, default:false}
})

module.exports = mongoose.model('Users',userSchema)