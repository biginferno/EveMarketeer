    import React from 'react';
import './App.css';

import LandingPage from "./Components/LandingPage";
import Header from './Components/Header/'
import Footer from './Components/Footer/';

function App() {
  return (
    <div className='full-page'>    
      <Header/>
      <LandingPage/>
      <Footer/>
    </div>
  );
}

export default App;
