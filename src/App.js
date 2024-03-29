import React, { useState } from 'react'
import './App.css';
import './AppMob.css';
import OAuth1 from './Components/OAuth1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OAuth2 from './Components/OAuth2';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Wishes from './Components/Wishes';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OAuth1 />} />
          <Route path="/auth1" element={<OAuth2 />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/wishes" element={<Wishes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;