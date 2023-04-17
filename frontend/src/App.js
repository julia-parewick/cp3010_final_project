import { Header } from './components/header';
import { Greeting } from './components/greeting';
import { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './components/profile';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AdminView } from './components/adminUI';


function Stats() {
  document.body.style = 'background: #7e7ac2;';
  const currentTime = new Date().getTime();
  const date = new Date(currentTime);

  return(
    <>
    <Header/>
    <Row className = "styleRow">
      <Col>
        <div class = "divStats">
          <h1>Stats</h1>
          <p>User: {localStorage.username}</p>
          <p>Today's Date: {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</p>
          <p>Last played: {localStorage.last_played} </p>
          <p>Today's score: {localStorage.score}/10</p>
          <p>Record Streak: {localStorage.record} correct answers in a row</p>
          <p>Perfect Scores: {localStorage.perfect}</p>
        </div>
      </Col>
    </Row>
    </>
  )
}


function TriviaGame(props) {
  const { isAuthenticated } = useAuth0();
  const [buttonVariants, setButtonVariants] = useState(['info','info','info','info']);
  let [index,setIndex] = useState(0);
  const currentTime = new Date().getTime();
  const date = new Date(currentTime);

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  props.questions.map((q,i)=>{
    q.answers = q.incorrect_answers;
    q.answers.push(q.correct_answer);
    q.answers = shuffle(q.answers);
  }) 

  const updateUser = async (email,lastPlayed,streak,record,perfect) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("lastPlayed",lastPlayed);
    urlencoded.append("currentStreak",streak);
    urlencoded.append("recordStreak",record);
    urlencoded.append("perfectScores",perfect);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    try{
      let response = await fetch("/api/user",requestOptions);
      if(response.status==200){
        console.log("Updated!")
      }
    }
    catch (e) {
      console.log('error', e)
    }
  }

  const handleAnswerClick = (questionObject, selectedAnswer, btnID) => {
    if(props.questions.indexOf(questionObject)==0){
      localStorage.setItem("score",0);
      if(localStorage.getItem("streak")==null){
        localStorage.setItem("streak",0);
      }
      if(localStorage.getItem("record")==null){
        localStorage.setItem("record",0);
      }
      if(localStorage.getItem("perfect")==null){
        localStorage.setItem("perfect",0);
      }
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
        if(localStorage.streak>localStorage.record){
          localStorage.record=localStorage.streak;
        }
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
      }
      setTimeout( () => {
        setButtonVariants(['info','info','info','info']);
        setIndex(index+1);
      }, 1000);
    }
    else if(props.questions.indexOf(questionObject)==9){
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
        if(localStorage.streak>localStorage.record){
          localStorage.record=localStorage.streak;
        }
        if(localStorage.score==10){
          localStorage.perfect++;
        }
        localStorage.setItem("last_played", date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear());
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
        localStorage.setItem("last_played", date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear());
      }
      setTimeout( () => {
        setButtonVariants(['info','info','info','info']);
        document.getElementById("quiz").innerHTML=`<h1>THANK YOU FOR PLAYING<h1/>`;
      }, 1000)

      //update user in db
      updateUser(localStorage.email,localStorage.last_played,localStorage.streak,localStorage.record,localStorage.perfect)

    }
    else{
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
        if(localStorage.streak>localStorage.record){
          localStorage.record=localStorage.streak;
        }
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
      }

      setTimeout( () => {
        setButtonVariants(['info','info','info','info']);
        setIndex(index+1);
      }, 1000);
    }
  };

  function btnColorCorrect(index){
    const newButtonVariants = [...buttonVariants]
    newButtonVariants[index] = 'success';
    setButtonVariants(newButtonVariants);
  }

  function btnColorIncorrect(index){
    const newButtonVariants = [...buttonVariants]
    newButtonVariants[index] = 'danger';
    setButtonVariants(newButtonVariants);
  }

  if(localStorage.getItem("last_played")!=date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear() || localStorage.getItem("last_played")==null){
    return (
      isAuthenticated &&(<div>
          <div class="hidden" key={index}>
              <Row className = "styleRow">
                <Col>
                  <div>
                  <br /><h2>Score: {localStorage.score}</h2><br />
                  <br /><h2>Streak: {localStorage.streak}</h2><br />
                  <br /><h2>Current Record Streak: {localStorage.record}</h2><br />
                  <h2>{props.questions[index].question}</h2>
                  <Button variant={buttonVariants[0]} style={{ width: "200px", height: "75px",}}
                  onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[0], 0)}}>{props.questions[index].answers[0]}</Button>
                  <Button variant={buttonVariants[1]} style={{ width: "200px", height: "75px",}}
                  onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[1], 1)}}>{props.questions[index].answers[1]}</Button>
                  <Button variant={buttonVariants[2]} style={{ width: "200px", height: "75px",}}
                  onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[2], 2)}}>{props.questions[index].answers[2]}</Button>
                  <Button variant={buttonVariants[3]} style={{ width: "200px", height: "75px",}}
                  onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[3], 3)}}>{props.questions[index].answers[3]}</Button><br /><br />
                  </div>
                </Col>
              </Row>
          </div>
      </div>)
    );
  }
  

}

function Index(props){  
  document.body.style = 'background: #7e7ac2;';
  let [ userData, setUser ] = useState([]);

  useEffect(() => {
      fetch('/api/getuser')
      .then(res => res.json())
      .then(setUser)
      .catch(e=>console.log(e.message));
  }, []);
  if(userData.length==0){
    return(
      <Row className = "styleRow"><br /><h3>Loading...</h3><br /></Row>
    )
  }else{
    return(
      <>
        <Header/>
        <Greeting users={userData}/>
        <div id="quiz">
          <TriviaGame questions={props.questions}/>
        </div>
      </>
    )
  }
}

function App() {
  document.body.style = 'background: #7e7ac2;';
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/game')
      .then(res => res.json())
      .then(setQuestions)
      .catch(e=>console.log(e.message));
  }, []);
  console.log(questions);
  if (questions.length==0){
    return <Row className = "styleRow"><br /><h3>Loading...</h3><br /></Row>
  }else{
    return (
      <Routes>
        <Route path="/" element={<Index questions={questions}/>}/>
        <Route path="/stats" element={<Stats/>}/>
      </Routes>
  )}
}

export default App;