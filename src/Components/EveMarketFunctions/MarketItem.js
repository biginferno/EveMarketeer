import React, {Component} from "react";
import Item from "./ItemInfo";

import {Card, CardTitle,CardText} from 'react-mdl';
import * as card from './flipcard.css'
const axios = require('axios').default;
//Jita
const jita_region = 10000002;
const jita_system = 30000142;
const jita_station = 60003760;

//Amarr
const amarr_region = 10000043;
const amarr_system = 30002187;
const amarr_station = 60008494;
class MarketItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Item Info
            item_id: 0,
            item_img: "",
            buy_info: {},
            sell_info:{},


            //Where the sale is happening
            buy_station: 0,
            sell_station: 0,
            buy_orders:{},
            sell_orders:{},
            //Extra Info
            item:{},
            item_html: {},
            data_loaded:false,
            received_info:false,
            created_item:false,
            generate_orders:false
        }
    }



    componentDidMount(){
        //Set the items ID
        this.setState({
            item_id:this.props.item_id,
            buy_station: this.props.buy_station,
            sell_station: this.props.sell_station
        },
        () => this.loadData());
        
    }
    sortMarketStation(order_info, station){
        let orders = [];
        // console.log("Order",order_info," station ", station)

        
        for(let k in order_info) {
            // console.log(order_info[k][0])
            if (order_info[k]["location_id"] === station)
                orders.push(order_info[k]);
        }
        return orders;
    }
    loadData(){
        let jita_region = this.state.buy_station;
        let amarr_region = this.state.sell_station;
        let item_id = this.state.item_id;
        const marketBuyOp = `https://esi.evetech.net/v1/markets/${jita_region}/orders/?datasource=tranquility&order_type=${'sell'}&page=1&type_id=${item_id}`;
        const marketSellOp = `https://esi.evetech.net/v1/markets/${amarr_region}/orders/?datasource=tranquility&order_type=${'buy'}&page=1&type_id=${item_id}`;

        axios
        //Get the Buy/Sell Orders
        .all([
            axios.get(marketBuyOp),
            axios.get(marketSellOp),
            
        ])
        .then(axios.spread((...response) => {
                const responseOne = response[0].data;
                const responseTwo = response[1].data;
                this.setState({
                    buy_orders: responseOne,
                    sell_orders: responseTwo,
                    received_info:true
                }) 
            }
        ));
        
    }
    produceStationOrders(){
        const jita_station = 60003760;
        const amarr_station = 60008494;
        // console.log(this.state)
        let buyResponse = this.state.buy_orders;
        let sellResponse = this.state.sell_orders;
        let buy_info = this.sortMarketStation(buyResponse, jita_station);
        let sell_info = this.sortMarketStation(sellResponse, amarr_station);

        this.setState({
            buy_info:buy_info,
            sell_info:sell_info,
            generate_orders:true
        })
    }
    produceItem(){
        const itemInfo = new Item(this.state.item_id, this.state.buy_info, this.state.sell_info);
        this.setState({
            item:itemInfo,
            data_loaded:true
        });
    }

    createHTML(){
        let item = this.state.item;
        item.createProfit();
        let id = item.returnTypeID().toString();
        let quan = item.returnQuantity().toString();
        let profit = item.returnTotalProfit();
        const icon = `https://images.evetech.net/types/${id}/icon`;
        const alt = `eve id ${id}`;
        return ([profit,
            <Card shadow={0} style={{width: '320px', height: '320px', float:"left"}}>
                <CardTitle expand style={{
                    height:'200px',
                    color: '#fff',
                    background:"red"
                    }}>   
                    <img src = {icon} alt={alt} width="100%" height="100%"/>
                    Update
                </CardTitle>
                <CardText>
                    <div>Id: {id}</div>
                    <div>Quantity to buy: {quan}</div>
                    <div>Total Profit: {profit}</div>
                </CardText>
            </Card>
        ]
        )
    }
    componentDidUpdate(prevProps,prevState,snapshot){

        if(prevState.received_info !== this.state.received_info ){
            this.produceStationOrders();
            // this.produceItem();
        }
        if(prevState.data_loaded !== this.state.data_loaded){
            let html = this.createHTML();
            this.setState({
                item_html:html,
                created_item:true
            })
        }
        if(prevState.generate_orders !== this.state.generate_orders){
            this.produceItem();
        }
    }

    render() {

        // console.log(this.state)
        let created = this.state.created_item;
        if(!created){
            return null;
        }
        else{
            let html_info = this.state.item_html;
            let profit = html_info[0];
            // console.log(html_info)
            let html = html_info[1];
            if(profit <= 0){
                // console.log("here")
                return null;
            }
            else{
                
                return html;
            }
        }
    }


}

export default MarketItem;