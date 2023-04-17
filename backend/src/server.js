import express from 'express';
import path from 'path';
import {MongoClient} from 'mongodb';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/triviaApp");

const triviaQuestions = mongoose.model('triviaQuestions', new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },  
    question:{
        type:String,
        required:true
    },
    correct_answer:{
        type:String,
        required:true
    },
    incorrect_answers:{
        type: [String],
        default: []
    }
}));

async function checkDBifEmpty(){
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('triviaApp');
    var collectionCount = await db.collection('triviaquestions').countDocuments()
    console.log("Collection Count: " + collectionCount)
    
        if( collectionCount == 0) {
            getQuestions()
        }
        else {
            console.log("Found Records : " + collectionCount);
        }
}
checkDBifEmpty();

async function getQuestions(){
    triviaQuestions.deleteMany({});
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        const response = loadedQuestions.results;

        triviaQuestions.collection.deleteMany();

        triviaQuestions.insertMany(response)
            .then((docs) => {
                console.log(`${docs.length} questions inserted`);
            })
            .catch((error) => {
                console.error(`Error inserting questions: ${error}`);
            })
            .finally(() => {
                mongoose.connection.close();
            });
        
    })
}

// Questions reset everynight at Midnight (00:00)
function scheduleFunction() {
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0, // Hour(in 24-hour format)
        0, // Minute
        0, // Second
        0 // Millisecond
    );
    let timeUntilTarget = targetTime.getTime() - now.getTime();
    if (timeUntilTarget < 0) {
        // If the target time has already passed today, schedule for tomorrow
        timeUntilTarget += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }
    setTimeout(() => {
        getQuestions();
        // setInterval(getQuestions(), 24 * 60 * 60 * 1000); // Schedule to repeat once a day
    }, timeUntilTarget);
}
scheduleFunction();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
})

app.get('/api/game', async (req,res)=>{
    //const client = new MongoClient('mongodb://localhost:27017');
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log("Connected to DB...getting daily questions.")
    const db = client.db('triviaApp');
    const questions = await db.collection('triviaquestions').find({}).toArray();
    //console.log(questions);
    res.json(questions);
})

app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});