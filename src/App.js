import './App.css';
import {Header} from './header';
import {Routes,Route} from 'react-router-dom';

function Index(props){
  return(
    <div>
      <Header />

    </div>
  );
}


function App() {
  let questions = [];
  return (
    <Routes>
        <Route path="/" element={<Index questions={questions}/>}/>
    </Routes>
  );
}

export default App;
