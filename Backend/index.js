const connectToMongo = require('./db');
const express = require("express");
const cors = require('cors');

connectToMongo();

const app = express();

app.use(cors())
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, ()=>{
    console.log(`App running at http://localhost:5000`);
})
