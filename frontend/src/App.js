// import './App.css';
import { Header } from './components/header';
import { Greeting } from './components/greeting';
import { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './components/profile';

function TriviaGame(props) {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  let [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);
  }
  console.log(props.questions)
  props.questions.map((q,i)=>{
    q.answers = q.incorrect_answers;
    q.answers.push(q.correct_answer);
  }) 
  return (
    isAuthenticated &&(<div>
      {props.questions.map((question, index) => (
        <div key={index}>
          <h2>{question.question}</h2>
          {/* {question.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))} */}
        </div>
      ))}
      <p>You selected: {selectedAnswer}</p>
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
