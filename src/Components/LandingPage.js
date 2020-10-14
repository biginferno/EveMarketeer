import React, {Component} from "react";
import MainCollection from "./Main";
const img = `https://images.evetech.net/types/587/icon`;
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
                    <div className="scrolling-values" style={{
                        height:200,
                        width:"100%",
                        background:"blue"
                    }}>
                        <marquee behavior="scroll" direction="left">
                            {/* <img src={img} alt="Italian Trulli"></img> */}
                            Here is some scrolling text... right to left!
                        </marquee>
                    </div>
                    {/*TODO: fill in later*/}
                    
                    <div className="Main-Info" >
                        <MainCollection/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;