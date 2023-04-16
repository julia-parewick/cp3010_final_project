// import './App.css';
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
  console.log(isAuthenticated);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  let [index,setIndex] = useState(0);

  // function handleAnswerClick(answer) {
  //   setSelectedAnswer(answer);
  //   index++;
  //   console.log(selectedAnswer)
  // }

  //console.log(props.questions)
  props.questions.map((q,i)=>{
    q.answers = q.incorrect_answers;
    q.answers.push(q.correct_answer);
  }) 

  const handleAnswerClick = (questionObject, selectedAnswer) => {
    if(props.questions.indexOf(questionObject)==0){
      localStorage.setItem("score",0);
      if(localStorage.getItem("streak")==null){
        localStorage.setItem("streak",0);
      }
      if(questionObject.correct_answer == selectedAnswer){
        localStorage.score++;
        localStorage.streak++;
      }else{
        localStorage.setItem("streak",0);
      }
      setIndex(index+1);
    }
    else if(props.questions.indexOf(questionObject)==9){
      if(questionObject.correct_answer == selectedAnswer){
        localStorage.score++;
        localStorage.streak++;
      }else{
        localStorage.setItem("streak",0);
      }
      document.getElementById("quiz").innerHTML=`<h1>THANK YOU FOR PLAYING<h1/>`
    }
    else{
      if(questionObject.correct_answer == selectedAnswer){
        localStorage.score++;
        localStorage.streak++;
      }else{
        localStorage.setItem("streak",0);
      }
      setIndex(index+1);
    }
    console.log(selectedAnswer)
  };

  return (
    isAuthenticated &&(<div>
        <div key={index}>
          <Row>
            <Col>
              <h2>{props.questions[index].question}</h2>
              <Button style={{ width: "200px", height: "75px"}}
              onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[0])}}>{props.questions[index].answers[0]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[1])}}>{props.questions[index].answers[1]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[2])}}>{props.questions[index].answers[2]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={()=>{handleAnswerClick(props.questions[index],props.questions[index].answers[3])}}>{props.questions[index].answers[3]}</Button><br></br>
            </Col>
          </Row>

        </div>
      {/* <p>You selected: {selectedAnswer}</p> */}
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

  console.log(questions);

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
