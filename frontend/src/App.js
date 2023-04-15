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


function TriviaGame(props) {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  let [selectedAnswer, setSelectedAnswer] = useState(null);

  // function handleAnswerClick(answer) {
  //   setSelectedAnswer(answer);
  //   console.log()
  // }

  //console.log(props.questions)
  props.questions.map((q,i)=>{
    q.answers = q.incorrect_answers;
    q.answers.push(q.correct_answer);
  }) 

  const handleAnswerClick = (selectedAnswer) => {
    console.log(selectedAnswer)
  };

  return (
    isAuthenticated &&(<div>
      {props.questions.map((question, index) => (
        <div key={index}>

          <Row>
            <Col>
              <h2>{question.question}</h2>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={() =>handleAnswerClick(question.answers[0])}>{question.answers[0]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={() =>handleAnswerClick(question.answers[1])}>{question.answers[1]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={() =>handleAnswerClick(question.answers[2])}>{question.answers[2]}</Button>
              <Button style={{ width: "200px", height: "75px",}}
              onClick={() =>handleAnswerClick(question.answers[3])}>{question.answers[3]}</Button><br></br>
            </Col>
          </Row>

        </div>
      ))}
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
      <TriviaGame questions={questions} setQuestions={setQuestions}/>
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
