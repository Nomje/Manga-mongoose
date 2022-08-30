const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_url,{
    userNewUrlParser: true,
    unseUnifedTopology: true
});

const db = mongoose.connection;

db.on('connected',function (){
    console.log(`connected to mongoDB${db.host}:${db.port}`)
});