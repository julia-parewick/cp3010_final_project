import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';
import path from 'path';
import {MongoClient} from 'mongodb';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECT2);

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

async function getQuestions(){
    triviaQuestions.deleteMany({});
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        const response = loadedQuestions.results;
        triviaQuestions.collection.deleteMany({});
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
getQuestions();

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

app.post('/api/adminreset', async(req,res)=>{
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(process.env.MONGO_CONNECT2);
    await client.connect();
    const db = client.db('test');
    const deleteAll = await db.collection('triviaquestions').deleteMany();
    console.log("triviaQuestions Db Cleared!");
    await client.close()
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(async loadedQuestions => {
        await client.connect();
        console.log(loadedQuestions.results);
        const reloadQuestions = await db.collection('triviaquestions').insertMany(loadedQuestions.results); 
        console.log("triviaQuestions DB reloaded!")

    })
    await client.close()

    res.sendStatus(200);
})

app.get('/api/game', async (req,res)=>{
    //const client = new MongoClient('mongodb://localhost:27017');
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(process.env.MONGO_CONNECT2);
    await client.connect();
    console.log("Connected to DB...getting daily questions.")
    const db = client.db('test');
    const questions = await db.collection('triviaquestions').find({}).toArray();
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }
    
    questions.map((q,i)=>{
        q.answers = q.incorrect_answers;
        q.answers.push(q.correct_answer);
        console.log(q.answers);
        q.answers = shuffleArray(q.answers)
        
        // console.log(q.answers);
      }) 
    console.log(questions);
    await client.close()
    res.json(questions);
}) 

app.get('/api/getuser', async(req,res)=>{
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(process.env.MONGO_CONNECT2);
    await client.connect();
    console.log("Connected to DB...getting users.")
    const db = client.db('test');
    const questions = await db.collection('users').find({}).toArray();
    console.log(questions);
    await client.close()
    res.json(questions);
})

app.post('/api/adduser',async(req,res)=>{
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(process.env.MONGO_CONNECT2);
    await client.connect();
    const db = client.db('test');
    console.log("Adding...");
    const adduser = await db.collection('users').insertOne({"email":req.body.email,"lastPlayed":"","currentStreak":0,"recordStreak":0,"perfectScores":0});
    await client.close()
    res.redirect("/");
})

app.post('/api/user', async(req,res)=>{
    console.log(req.body.email);
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    const client = new MongoClient(process.env.MONGO_CONNECT2);
    await client.connect();
    console.log("Updating user stats...");
    const db = client.db('test');
    const user = await db.collection('users').findOneAndReplace({email:req.body.email},
        {
            email:req.body.email,
            lastPlayed:req.body.lastPlayed,
            currentStreak:req.body.currentStreak,
            recordStreak:req.body.recordStreak,
            perfectScores:req.body.perfectScores
        }
    );
    console.log("User Updated!");
    await client.close()
    res.sendStatus(200);
})

app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});