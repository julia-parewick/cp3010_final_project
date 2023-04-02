import './App.css';
import {Header} from './components/header';
import {Routes,Route} from 'react-router-dom';
import Profile from './components/profile';

function Index(props){
  return(
    <div>
      <Header />
      <Profile />
    </div>
  );
}


function App() {
  let questions = [];
  return (
      <Routes>
        <Route path="/" element={<Index questions={questions}/>}/>
        {/* <Route path="/profile" component={Profile} /> */}
      </Routes>
  );
}

export default App;
