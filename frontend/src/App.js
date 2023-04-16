//import './App.css';
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
// import './game.css';


function Stats() {
  const currentTime = new Date().getTime();
  const date = new Date(currentTime);

  return(
    <>
    <Header/>
    <h1>Stats</h1>
    <p>User: {localStorage.username}</p>
    <p>Today's Date: {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</p>
    <p>Last played: {localStorage.last_played} </p>
    <p>Today's score: {localStorage.score}</p>
    <p>Record Streak: {localStorage.record}</p>
    </>
  )
}


function TriviaGame(props) {
  const { isAuthenticated } = useAuth0();
  const [buttonVariants, setButtonVariants] = useState(['info','info','info','info']);
  let [index,setIndex] = useState(0);
  const currentTime = new Date().getTime();
  const date = new Date(currentTime);

  props.questions.map((q,i)=>{
    q.answers = q.incorrect_answers;
    q.answers.push(q.correct_answer);
  }) 

  const handleAnswerClick = (questionObject, selectedAnswer, btnID) => {
    if(props.questions.indexOf(questionObject)==0){
      localStorage.setItem("score",0);
      if(localStorage.getItem("streak")==null){
        localStorage.setItem("streak",0);
      }
      if(localStorage.getItem("record")==null){
        localStorage.setItem("record",0);
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
              <Row>
                <Col>
                  <div>
                  <br /><h2>Score: {localStorage.score}</h2><br />
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

function Index(){

  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/game')
      .then(res => res.json())
      .then(setQuestions)
      .catch(e=>console.log(e.message));
  }, []);

  return(
    <>
      <Header/>
      <Greeting />
      <div id="quiz">
        <TriviaGame questions={questions} setQuestions={setQuestions}/>
      </div>
      {/* <Profile /> */}
    </>
  );
}

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/stats" element={<Stats/>}/>
      </Routes>
  );
}

export default App;