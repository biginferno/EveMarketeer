import React, {Component} from "react";
import Market from "../EveMarketeer/Market";
import EveIndex from './EveIndex/EveIndex'
import About from './About/About'
import { BrowserRouter as Router, Route } from "react-router-dom";
class LandingPage extends Component {

    render() {
         
        return(
            <Router>
                <Route path="/market" exact component={Market} />
                <Route path="/eveindex" exact component={EveIndex} />
                <Route path="/about" exact component={About} />
            </Router>
        )
    }
}

export default LandingPage;