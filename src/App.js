import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'

import Routes from "./Components/routes";
import Header from './Components/Header/header'
import Footer from './Components/Footer/footer';

import './app.css';

function App() {
  return (
    <div className='full-page'>
      <Header/>
      <Router>
        <Routes/>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
