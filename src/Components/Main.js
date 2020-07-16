import React, {Component} from "react";
import StationBuySellFunctions from "./EveMarketFunctions/StationBuySellFunctions";
// import {itemID} from "./AxiosCalls"
// const axios = require('axios').default;
import * as api from "./EveMarketFunctions/AXIOS"


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
    async itemID(region){
        let finalList;
        let pages = 0;
        let currentPage = 1;
        /*
        let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;

        await axios
            .get(region_buy_id)
            .then(json => {
                pages = json.headers['x-pages'];
                for(let k in Object.values(json.data)){
                    finalList.push(json.data[k]);
                }
                currentPage++;
            });
        while(currentPage <= pages) {
            let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;
            await axios
            .get(region_buy_id)
            .then((json) => {
                for(let k in Object.keys(json.data)){
                    finalList.push(json.data[k]);
                }
            });
            currentPage++;
        }
        */
        finalList = await api.getAllItemID(region);
        console.log(finalList.length)
        switch(region) {
            case jita_region:
                this.setState({buyID: finalList, buyDone: true});
                break;
            case amarr_region:
                this.setState({sellID: finalList, sellDone: true});
                break;
            default:
                break;
        }


    }
    componentDidMount() {
        let buyList = [];
        let sellList = [];



        this.itemID(jita_region);
        this.itemID(amarr_region);


    }

    render() {
        // console.log("Buy done", this.state.buyDone);
        // console.log("Buy ID", this.state.buyID);
        if(!(this.state.buyDone && this.state.sellDone)) {

            return (
                //Show previous
                <div>
                    Users Loading
                </div>
            )
        } else {
            // console.log("Sell done", this.state.sellDone);
            // console.log("Buy done", this.state.buyID);
            return (
                <div width="100%"><StationBuySellFunctions sellID = {this.state.sellID} buyID = {this.state.buyID}/></div>
                
                // <div>
                //
                //     Users: {this.state.users}
                // </div>
            )
        }
    }
}

export default MainCollection;
























