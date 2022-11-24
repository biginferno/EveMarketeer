// Market takes the user inputs buyStation, sellStation, freighter from Toolbar
// and passes the correlating information to MarketView that will provide the views
// from the data MarketCalculator provides


import Axios from "axios";
import React, {useState} from "react";
import Toolbar from '../../Toolbar/Toolbar';
import MarketView from './MarketView'

export const stations = {
    'Jita':{
        id: 1,
        region: 10000002,
        station: 60003760
    },
    'Amarr':{
        id: 2,
        region: 10000043,
        station: 60008494
    },
    'Dodixie':{
        id: 3,
        region: 10000032,
        station: 60011866
    },
    'Rens':{
        id: 4,
        region: 10000030,
        station: 60004588
    },
    'Hek':{
        id: 5,
        region: 10000042,
        station: 60005686

    }
}

export const  freighters = {
    'Providence': {
        id: 1,
        m3: 1200000
    },
    'Charon': {
        id: 2,
        m3: 1100000
    },
    'Obelisk': {
        id: 3,
        m3: 1300000
    },
    'Fenrir': {
        id: 4,
        m3: 1400000
    }
}

function Market(){
    const [options, setOptions] = useState({
        optionsChosen: false
    });

    // const response = Axios.

    const handleToolbarCallback = (options) => {
        setOptions({
            ...options,
            optionsChosen: true
        });
        console.log("Options: ",options)
    }

    return(
        <div className="market" style={{"height":"auto"}}>
            <Toolbar toolbarCallback = {handleToolbarCallback}/>
            {options.optionsChosen
               ? <MarketView options={options}/>
               : <div>Please Select Your Stations and Freighter</div>
            }
        </div> 
    );       
}
export default Market;
























