import express from 'express';
import path from 'path';
import {MongoClient} from 'mongodb';
import { fileURLToPath } from 'url';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;


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

app.get('/game', requiresAuth(), (req,res)=>{
    // const client = new MongoClient('mongodb+srv://admin:cBldZOscaAMs3zbM@cluster0.gyf5z.mongodb.net/?retryWrites=true&w=majority');
    // await client.connect();
    // const db = client.db('triviaApp');
    // const appUser = await db.collection('users').find({}).toArray();
    // console.log(appUser);
    // res.json( appUser );
    res.send(JSON.stringify(req.oidc.user, null, 2));
})
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});