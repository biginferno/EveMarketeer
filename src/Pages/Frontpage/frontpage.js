import React from "react";
import './frontpage.css'
import space3 from '../../Assets/space3.jpg'
import space2 from '../../Assets/space2.jpg'
import space1 from '../../Assets/background.jpg'

function Frontpage() {

    return(
        <>
        <div className="miniabout">
        
        </div>
        <div className="frontpage">
            <a href="/market" className="panel">
  
                <img alt="space1" src={space1}/>
                <div className="text">Eve Marketeer</div>
            </a>
            
            <a href="/eveindex" className="panel">
  
                <img alt="space2" src={space2}/>
                <div className="text">Eve Index</div>
            </a>
            <a href="/about" className="panel">
                
                <img alt="space3" src={space3}/>
                <div className="text">About</div>
            </a>
            
        </div>
        </>
        
    );
}

export default Frontpage;