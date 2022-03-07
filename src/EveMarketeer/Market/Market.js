import React, {Component} from "react";
import StationBuySellFunctions from "../EveMarketFunctions/StationBuySellFunctions";
import JitaComponent from './Components/Stations/Jita'
import AmarrComponent from './Components/Stations/Amarr'
import DodixieComponent from './Components/Stations/Dodixie'
import RensComponent from './Components/Stations/Rens'
import HekComponent from './Components/Stations/Hek'
import Toolbar from '../../Components/Toolbar/Toolbar';
import MarketView from './MarketView'

var stations = {
    Jita:{
        region: null,
        station: null
    },
    Amarr:{
        region: null,
        station: null
    },
    Dodixie:{
        region: null,
        station: null
    },
    Rens:{
        region: null,
        station: null
    },
    Hek:{
        region: null,
        station: null
    }

}

class Market extends Component{
    constructor(props) {
        super(props);
     
        this.state = {
          buy_station: null,
          sell_station: null,
          freight: null,
        };
    }
    handleToolbarCallback = (options) =>{
        this.setState({
            buy_station: options.buy_station,
            sell_station: options.sell_station,
            freight: options.freight
        })
    }
    render(){
        let buy_info = stations[this.state.buy_station];
        let sell_info = stations[this.state.sell_station];
        let freight = stations[this.state.freight]
        return(
            <div>
                <Toolbar toolbarCallback = {this.handleToolbarCallback}/>
                <MarketView />
            </div>

        );       
    }

}

export default Market;
























