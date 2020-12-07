const mongoose = require('mongoose')
require('mongoose-type-email')
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'; 
const Email = mongoose.SchemaTypes.Email; 

const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    
    firstname:{ type:String , requierd:true },
    lastname:{ type:String , requierd:true },
    email:{ type:Email , requierd:true , correctTld:true , unique:true },
    password: { type:String , requierd:true }
})

module.exports = mongoose.model('Users',UserSchema)