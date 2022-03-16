import React from 'react';
import './App.css';

import Main from "./Components/Main";
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className='full-page'>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
