import React from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Components/Main";
import LandingPage from "./Components/LandingPage";
import Toolbar from './Components/Toolbar/toolbar'
import JitaComponent from './Components/Stations/Jita'
import AmarrComponent from './Components/Stations/Amarr'
import DodixieComponent from './Components/Stations/Dodixie'
import RensComponent from './Components/Stations/Rens'
import HekComponent from './Components/Stations/Hek'

function App() {
  return (


    <Router>
      <Toolbar />
      <br />

      <Route path="/" exact component={LandingPage} />
      {/* <Route path="/" exact component={JitaComponent} /> */}
      <Route path="/jita" exact component={JitaComponent} />
      <Route path="/dodixie" component={DodixieComponent} />
      <Route path="/amarr" component={AmarrComponent} />
      <Route path="/rens" component={RensComponent} />
      <Route path="/hek" component={HekComponent} />
    </Router>

    
  );
}

export default App;
