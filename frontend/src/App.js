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

let index = 0;
function TriviaGame(props) {
  const { isAuthenticated } = useAuth0();
  //console.log(isAuthenticated);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  const [buttonVariants, setButtonVariants] = useState(['info','info','info','info']);
  let [index,setIndex] = useState(0);

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
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
      }
      setTimeout( () => {
        setButtonVariants(['info','info','info','info']);
        setIndex(index+1);
      }, 1000);
      //setIndex(index+1);
    }
    else if(props.questions.indexOf(questionObject)==9){
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
      }
      document.getElementById("quiz").innerHTML=`<h1>THANK YOU FOR PLAYING<h1/>`
    }
    else{
      if(questionObject.correct_answer == selectedAnswer){
        btnColorCorrect(btnID)
        localStorage.score++;
        localStorage.streak++;
      }else{
        btnColorIncorrect(btnID)
        localStorage.setItem("streak",0);
      }

      setTimeout( () => {
        setButtonVariants(['info','info','info','info']);
        setIndex(index+1);
      }, 1000);
    }
    //console.log(selectedAnswer)
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

  return (
    isAuthenticated &&(<div>
        <div key={index}>
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
        {/* <Route path="/stats" element={<Stats/>}/> */}
      </Routes>
  );
}

export default App;