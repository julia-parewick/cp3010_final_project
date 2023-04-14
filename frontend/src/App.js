// import './App.css';
import { Header } from './components/header';
import { Greeting } from './components/greeting';
import { Routes,Route } from 'react-router-dom';
import { TriviaGame } from './components/game';
import Profile from './components/profile';
import { useEffect, useState } from 'react';


function Index(){
  return(
    <>
      <Header/>
      <Greeting />
      <TriviaGame />
      {/* <Profile /> */}
    </>
  );
}

// function GamePage(){
//   return(
//   <>
//   <Header/>
//   <TriviaGame/>
//   </>
//   )
// }

// function Stats(){
//   return(
//     <>
//     <Profile/>
//     </>
//   )
// }
// function TriviaGame() {

//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//   useEffect(() => {
//     fetch('"https://opentdb.com/api.php?amount=10&type=multiple"')
//       .then(response => response.json())
//       .then(data => setQuestions(data));
//   }, []);

//   function handleAnswerClick(answer) {
//     setSelectedAnswer(answer);
//   }

//   return (
//     <div>
//       {questions.map((question, index) => (
//         <div key={index}>
//           <h2>{question.question}</h2>
//           {question.answers.map((answer, index) => (
//             <button key={index} onClick={() => handleAnswerClick(answer)}>
//               {answer}
//             </button>
//           ))}
//         </div>
//       ))}
//       <p>You selected: {selectedAnswer}</p>
//     </div>
//   );
// }

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>}/>
      </Routes>
  );
}

export default App;
