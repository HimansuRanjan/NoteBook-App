const connectToMongo = require('./db');
const express = require("express");

connectToMongo();

const app = express();

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, ()=>{
    console.log(`App running at http://localhost:5000`);
})
