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
//   const currentTime = new Date().getTime();
//   const date = new Date(currentTime);

//     return(
//         <div class = "container">
//         <div id ="game" class="justify-center flex-column">

//             <div id="hud-item">
//                 <p class="hud-prefix">
//                     Score
//                 </p>
//                 <h1 class="hud-main-text" id = "score">
//                     0
//                 </h1>
//             </div>
  
//             <h2 id = "question">What are the answers?</h2>
//             <div class = "choice-container">
//                 <p class = "choice-prefix">A</p>
//                 <p class = "choice-text" data-number= "1"></p>
//             </div>
//             <div class = "choice-container">
//                 <p class = "choice-prefix">B</p>
//                 <p class = "choice-text" data-number= "2"></p>
//             </div>
//             <div class = "choice-container">
//                 <p class = "choice-prefix">C</p>
//                 <p class = "choice-text" data-number= "3"></p>
//             </div>
//             <div class = "choice-container">
//                 <p class = "choice-prefix">D</p>
//                 <p class = "choice-text" data-number= "4"></p>
//             </div>
//         </div>

//     </div>)
// }

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>}/>
      </Routes>
  );
}

export default App;
