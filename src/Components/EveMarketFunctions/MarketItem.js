import React, {Component} from "react";
import {Item} from "./ItemInfo";
const axios = require('axios').default;
const marketBuyOp = `https://esi.evetech.net/v1/markets/${jita_region}/orders/?datasource=tranquility&order_type=${'sell'}&page=1&type_id=${itemID}`;
const marketSellOp = `https://esi.evetech.net/v1/markets/${amarr_region}/orders/?datasource=tranquility&order_type=${'buy'}&page=1&type_id=${itemID}`;

class MarketItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Item Info
            item_id: 0,
            item_img: "",
            buyInfo: [],
            sellInfo:[],


            //Where the sale is happening
            buy_station: 0,
            sell_station: 0,

            //Extra Info
            item: null
        }
    }



    componentDidMount(){
        //Set the items ID
        this.setState({
            item_id:this.props.item_id,
            buy_station: this.props.buy_station,
            sell_station: this.props.sell_station
            });
        axios
            //Get the Buy/Sell Orders
            .all([
                axios.get(marketSellOp),
                axios.get(marketBuyOp)
            ])
            .then(axios.spread(
                function(buyResponse, sellResponse){
                    this.setState({
                        buyInfo: buyResponse,
                        sellInfo: sellResponse
                    }) 
                }
            ))
            .then(function(){
                const itemInfo = Item.createItem(this.state.item_id, this.state.buyInfo, this.state.sellInfo);
                this.setState({item:itemInfo})
                }
            )
    }

    render() {
            return(
                <div>
                    ho

                </div>
            )
    }








}