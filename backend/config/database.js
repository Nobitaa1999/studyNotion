const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`database connected successfully`);
    })
    .catch((error)=>{
        console.log("DB connection faild");
        console.error(error);
        process.exit(1);
    })
}