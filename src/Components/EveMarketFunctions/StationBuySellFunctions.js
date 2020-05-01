import React, {Component} from "react";
import {Item} from "./ItemInfo";
const axios = require('axios').default;

//Jita
const jita_region = 10000002;
const jita_system = 30000142;
const jita_station = 60003760;

//Amarr
const amarr_region = 10000043;
const amarr_system = 30002187;
const amarr_station = 60008494;

class StationBuySellFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy_id: [],
            sell_id: [],
            applicable_orders:[],
            acceptableID: [],
            done: false
        }
    }

    componentDidMount(){
        this.setState({buy_id:this.props.buyID, sell_id:this.props.sellID});

    }
    componentDidUpdate(prevProps, prevState, snapshot)
     {
        if(prevState.buy_id !== this.state.buy_id || prevState.sell_id !== this.state.sell_id){
            this.setState({buy_id: this.props.buyID, sell_id:this.props.sellID});
            console.log("Updating");
            this.createAcceptableID(this.state.buy_id, this.state.sell_id);



        }
    }

    async marketInfo(region,itemID){
        // itemID = 32772;
        // console.log(itemID);
        let station = 0;
        let orderType;
        let buy_orders = [];
        let sell_orders =[];
        switch(region){
            case 10000002:
                orderType = 'buy';
                station = jita_station;
                break;
            case 10000043:
                orderType = 'sell';
                station=amarr_station;
                break;
            default:
                orderType = 'buy';
                break;
        }

        const marketBuyOp = `https://esi.evetech.net/v1/markets/${jita_region}/orders/?datasource=tranquility&order_type=${'buy'}&page=1&type_id=${itemID}`;
        const marketSellOp = `https://esi.evetech.net/v1/markets/${amarr_region}/orders/?datasource=tranquility&order_type=${'sell'}&page=1&type_id=${itemID}`;
        await axios
            .get(marketBuyOp)
            .then(json => {
                // console.log("Object values", Object.values(json.data));
                for(let k in Object.values(json.data)){
                    if(json.data[k]["location_id"] === jita_station)
                        buy_orders.push(json.data[k]);
                }
            });
            // .then(() => {
            //
            // })
            // .then(()=> {
            //     this.setState({})
            // })
        await axios
            .get(marketSellOp)
            .then(json => {
                // console.log("Object values", Object.values(json.data));
                for(let k in Object.values(json.data)){
                    if(json.data[k]["location_id"] === amarr_station)
                        sell_orders.push(json.data[k]);
                }
            });
        // let info = new ItemInfo(buy_orders, sell_orders);
        // console.log("Info ",info);
        return new Item(buy_orders,sell_orders);
    }



    createAcceptableID(buy_id, sell_id) {
        let intersection = buy_id.filter(x => sell_id.includes(x));
        let info = [];
        // console.log(intersection);
        this.setState({acceptableID: intersection});
        for(let i = 0; i < 10; i++) {
            info.push(this.marketInfo(jita_region, intersection[i]));
        }
        console.log(info);
        this.setState({applicable_orders: info, done: true});
    }
    createHTML(){

        let infoStack = this.state.applicable_orders;
        let str = "";
        // console.log("here",infoStack);
        infoStack.forEach(function(item) {


            str += "<div className='flip-card'> " +
                "<div className='flip-card-inner'> " +
                    '<div className="flip-card-front"> ' +
                        '<img src="eve_image.jpg" ' +
                        'alt="Avatar" ' +
                        'style="width:300px;height:300px;"/> ' +
                    '</div> ' +
                    '<div className="flip-card-back"> ' +
                        `<h1>${item.returnTypeID}</h1> ` +
                        `<p>${item.returnQuantity}</p> ` +
                        `<p>${item.returnTotalProfit}</p> ` +
                    `</div> ` +
                    `</div> ` +
                `</div> `;
        });
    }
    render(){
        if(!(this.state.done)) {
            return (
                //Show previous
                <div>
                    Users Loaded
                </div>
            )
        }
        else
            {
                return (
                    <div>
                        {this.createHTML()}
                    </div>

                )
            }
    }
}
export default StationBuySellFunctions;