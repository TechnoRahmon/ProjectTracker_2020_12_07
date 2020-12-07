const mongoose = require('mongoose')


module.exports.connectDB = async ()=>{
    try{

            const conn = await mongoose.connect(process.env.MONGO_URI ,{
            useCreateIndex:true,
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`MongoDB connected at :${conn.connection.host}`.cyan.underline.bold);
    }
    catch(err){
            console.log(`Error: ${err}`.red);
            process.exit(1); 
    }

}