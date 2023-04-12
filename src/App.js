// import './App.css';
import {Header} from './components/header';
import {Routes,Route} from 'react-router-dom';
import Profile from './components/profile';
import { useEffect, useState } from 'react';
// import React from 'react';


function Index(){
  return(
    <div>
      <Header/>
      <Profile />
    </div>
  );
}

function App() {

  return (
      <Routes>
        <Route path="/" element={<Index/>}/>
        {/* <Route path="/profile" component={Profile} /> */}
      </Routes>
  );
}

export default App;
