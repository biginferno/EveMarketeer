import React, {Component} from "react";
import UsersComponent from "./EveMarketFunctions/AXIOS";

class LandingPage extends Component {
    render() {
        return(
            <div style={{width:'100%',height:'75%', margin:'auto'}}>
                <div className="landing-grid">
                    {/*Simple banner just showing title of page + img*/}
                    <div className="banner-img">
                        <h1>Banner</h1>
                    </div>
                    {/*table showing level 3 info about stations i.e overall info*/}
                    <div className="general-info">
                        
                    </div>
                    {/*TODO: fill in later*/}
                    <UsersComponent/>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;