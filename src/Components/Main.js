import React from "react";
import Frontpage from './Frontpage/Frontpage.js'
import Market from "./EveMarketeer/Market/Market";
import EveIndex from './EveIndex/EveIndex'
import About from './About/About'
import { BrowserRouter as Router, Route } from "react-router-dom";
function Main() {
         
        return(
            <Router>
                <Route path="/" exact component={Frontpage}/>
                <Route path="/market" exact component={Market} />
                <Route path="/eveindex" exact component={EveIndex} />
                <Route path="/about" exact component={About} />
            </Router>
        )
}

export default Main;