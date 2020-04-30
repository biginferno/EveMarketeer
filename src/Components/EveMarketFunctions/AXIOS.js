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

        let pages = 0;
        let currentPage = 1;
        let region_buy_id = `https://esi.evetech.net/latest/markets/${current_buy_region}/types/?datasource=tranquility&page=${currentPage}`;

        // axios
        //     .get(region_buy_id)
        //     .then(json => {
        //         pages = json.headers['x-pages'];
        //
        //         this.state.buyID.push(json.data);
        //         currentPage++;
        //         // console.log(currentPage);
        //         while(currentPage <= pages) {
        //             // console.log(currentPage);
        //             let region_buy_id = `https://esi.evetech.net/latest/markets/${current_buy_region}/types/?datasource=tranquility&page=${currentPage}`;
        //             axios.get(region_buy_id)
        //
        //                 .then((json) => {
        //
        //                     this.state.buyID.push(json.data);
        //
        //                 });
        //
        //             currentPage++;
        //
        //         }
        //         // return finalList;
        //     })
        //     .then(() => {
        //         this.setState({buyDone: true});
        //     })
        //     .catch((error) => {
        //         //Handle Errors
        //     });


        // pages = 0;
        // currentPage = 1;
        // let region_sell_id = `https://esi.evetech.net/latest/markets/${current_sell_region}/types/?datasource=tranquility&page=${currentPage}`;
        // // let json = await axios.get(region_buy_id);
        // axios
        //     .get(region_sell_id)
        //     .then(json => {
        //         pages = json.headers['x-pages'];
        //         this.state.sellID.push(json.data);
        //         currentPage++;
        //         // console.log(currentPage);
        //         while(currentPage <= pages) {
        //             // console.log(currentPage);
        //             let region_buy_id = `https://esi.evetech.net/latest/markets/${current_sell_region}/types/?datasource=tranquility&page=${currentPage}`;
        //             axios.get(region_buy_id)
        //                 .then((json) => {
        //                     this.state.sellID.push(json.data);
        //                 });
        //             currentPage++;
        //         }
        //         // return finalList;
        //     })
        //     .then(() => {
        //         // console.log("Setting Sell Done");
        //         this.setState({sellDone: true});
        //
        //     })
        //
        //
        //     .catch((error) => {
        //         //Handle Errors
        //     });
        let buyList = [];
        let sellList = [];
        // this.setState({buyDone: itemID(buyList, current_buy_region)});
        let acceptableID = [];

        this.setState({buyDone:itemID(this.state.buyID, current_buy_region)});
        this.setState({sellDone:itemID(this.state.sellID, current_sell_region)});
        // this.setState({sellDone: itemID(sellList, current_sell_region)});
        // console.log(buyList.length);
        // for(let i = 0; i < buyList.length; i++){
        //     for(let j = 0; j < buyList[i].length; j++){
        //             console.log("Here");
        //             acceptableID.push(buyList[i][j]);
        //
        //     }
        // }
        // const acc =  buyList.flat(1);
        // console.log(sellList.length);
        // console.log("Flat Array",acceptableID);
        // console.log("sellList",sellList);
        // this.setState({sellDone: itemID(sellList, current_sell_region)});

        // let intersection = buyList.filter(x => sellList.includes(x));
        // console.log("Intersection ", intersection);
        // this.setState({buyID: buyList, sellID: sellList});
        // console.log("SellID", this.state.sellID);
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
            // console.log("Buy done", this.state.buyDone);
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