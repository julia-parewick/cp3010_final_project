const express = require('express')

const path = require('path');
const fileURLToPath = require('url');
// import {MongoClient} from 'mongodb';

const app = express();
app.use(express.json());


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
})

app.get('/',(req,res)=>{
    res.json({msg: "hello world"});
})
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});