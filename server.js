const express = require('express');
const routes = require('./routes/packages'); 
const { supabase } = require('./config/SupabaseClient');

const app = express();

app.use(express.json());
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', routes); 

app.listen(8000,() => console.log( "listening at 8000"));