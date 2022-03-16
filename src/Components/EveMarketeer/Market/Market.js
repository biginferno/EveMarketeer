// Market takes the user inputs buyStation, sellStation, freighter from Toolbar
// and passes the correlating information to MarketView that will provide the views
// from the data MarketCalculator provides


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
        region: null,
        station: null
    },
    'Rens':{
        id: 4,
        region: null,
        station: null
    },
    'Hek':{
        id: 5,
        region: null,
        station: null
    }
}

export const  freighters = {
    'Providence': {
        id: 1,
        m3: 10
    },
    'Charon': {
        id: 2,
        m3: 10
    },
    'Obelisk': {
        id: 3,
        m3: 10
    },
    'Fenrir': {
        id: 4,
        m3: 10
    }
}

function Market(){
    const [options, setOptions] = useState({})
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
























