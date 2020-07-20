import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from "react-mdl";
import {Link, Router} from "react-router-dom";
import Main from "./Components/Main";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <div className="App">
      {/*<Layout>*/}
        <Header className="app-header">
         <Navigation>
           <Router>
              <Link className="header-right" to="#">Jita Trades</Link>
              <Link className="header-right" to="#">Amarr Trades</Link>
              <Link className="header-right" to="#">Dodixie Trades</Link>
              <Link className="header-right" to="#">Rens Trades</Link>
              <Link className="header-right" to="#">Hek Trades</Link>
            </Router>
         </Navigation>
        </Header>

        {/*<Content>*/}
          <div className="page-content">
            <LandingPage/>
          </div>
        {/*</Content>*/}
      {/*</Layout>*/}
      <div className="Footer">
        Footer
      </div>
    </div>
  );
}

export default App;
