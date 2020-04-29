import React, {Component} from "react";
import StationBuySellFunctions from "./StationBuySellFunctions";
import {itemID} from "./AxiosCalls"
const axios = require('axios').default;


//Eve ID
//Jita
const jita_region = 10000002;
const jita_station = 30000142;

//Amarr
const amarr_region = 10000043;
const amarr_station = 30002187;

//Eve Routes
let current_buy_region = jita_region;
let current_sell_region = amarr_region;
let order_type;
let type_id;
let current_region;

const buy_order = `buy`;
const sell_order = `sell`;

const marketBuyOp = `https://esi.evetech.net/v1/markets/${current_buy_region}/orders/?datasource=tranquility&order_type=${order_type}&page=1&type_id=${type_id}`;


//TODO: Get item numbers and seperate what is in the current sell region
class MainCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyID: [],
            sellID:[],
            acceptableID:[],
            buyDone: false,
            sellDone: false
        }
    }
    componentDidMount() {
        // current_region = current_buy_region;
        // let region_buy_id = `https://esi.evetech.net/latest/markets/${current_buy_region}/types/?datasource=tranquility&page=1`;
        // let region_sell_id = `https://esi.evetech.net/latest/markets/${current_sell_region}/types/?datasource=tranquility&page=1`;
        // axios.get(region_buy_id)
        //     .then(json => this.setState({ buyID: json.data, buyDone: true}));
        //
        //
        // axios.get(region_sell_id)
        //     .then(json => this.setState({ sellID: json.data, sellDone: true}))
        let finalList = [];
        itemID(finalList);
        console.log(finalList);

    }
    produceAcceptableOrders(){
        let intersection = this.state.buyID.filter(x => this.state.sellID.includes(x));
        this.setState({acceptableID: intersection});
    }
    returnUsers(){
        let string = '';
        this.state.itemID.forEach(item => string += `<div>`+ item + '</div>');
        return(
            <div>
                {string}
            </div>
        )
    }
    render() {
        if(!(this.state.buyDone && this.state.sellDone)) {
            return (
                //Show previous
                <div>
                    Users Loading
                </div>
            )
        } else {
            return (
                <StationBuySellFunctions sellID = {this.state.sellID} buyID = {this.state.buyID}/>
                // <div>
                //
                //     Users: {this.state.users}
                // </div>
            )
        }
    }
}

export default MainCollection;