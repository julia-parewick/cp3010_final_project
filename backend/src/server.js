import express from 'express';
import path from 'path';
import {MongoClient} from 'mongodb';
import { fileURLToPath } from 'url';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;
import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/triviaApp");

//const questionSchema = new mongoose.Schema({
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

//const Question = mongoose.model('Question', questionSchema)

async function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        const response = loadedQuestions.results;

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


        //console.log(response)
        // for(let i = 0; i < loadedQuestions.results.length;i++){
        //     // console.log(response[i]['type'])
        //     const question = new Question({
        //         category: response[i]['category'],
        //         type: response[i]['type'],
        //         difficulty: response[i]['difficulty'],
        //         question: response[i]['question'],
        //         correct_answer: response[i]['correct_answer'],
        //         incorrect_answers: response[i]['incorrect_answers'],
        //     });
        //     question.save;
        //}


getQuestions();

// function scheduleFunction() {
//     const now = new Date();
//     const targetTime = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate(),
//         12, // Hour(in 24-hour format)
//         0, // Minute
//         0, // Second
//         0 // Millisecond
//     );
//     let timeUntilTarget = targetTime.getTime() - now.getTime();
//     if (timeUntilTarget < 0) {
//         // If the target time has already passed today, schedule for tomorrow
//         timeUntilTarget += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
//     }
//     setTimeout(() => {
//         myFunction();
//         setInterval(getQuestions, 24 * 60 * 60 * 1000); // Schedule to repeat once a day
//     }, timeUntilTarget);
// }
  
// scheduleFunction();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../build')));



const config = {
    authRequired: false,
    auth0Logout: true,
    secret: '2u3j12vrdfasyfusdflakshdfasuigckagRjhVkdgaksfh',
    baseURL: 'http://localhost:8000',
    clientID: 'x39IPmqPCtdzBmwsWOCe0t0CxCbsfVHU',
    issuerBaseURL: 'https://dev-dj35ycuxy140l8dl.us.auth0.com'
  }; 

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
})

app.get('/game', requiresAuth(), async (req,res)=>{
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('triviaApp');
    const questions = await db.collection('triviaQuestions').find({}).toArray();
    // console.log(appUser);
    // res.json( appUser );
    //res.send(JSON.stringify(req.oidc.user, null, 2));
    res.send("good");
})
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});