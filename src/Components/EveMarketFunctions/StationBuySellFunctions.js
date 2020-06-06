import React, {Component} from "react";
import {Item} from "./ItemInfo";
import image from './eve_image.jpg';
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
    async itemJSON(op, station){
        let orders = [];

        let json = await axios.get(op);
        for(let k in Object.values(json.data)) {
            if (json.data[k]["location_id"] === station)
                orders.push(json.data[k]);
        }
        return orders;
    }
    async marketInfo(region,itemID){
        let station = 0;
        let orderType;
        let buy_orders = [];
        let sell_orders =[];
        // let info =[];
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

        const marketBuyOp = `https://esi.evetech.net/v1/markets/${jita_region}/orders/?datasource=tranquility&order_type=${'sell'}&page=1&type_id=${itemID}`;
        const marketSellOp = `https://esi.evetech.net/v1/markets/${amarr_region}/orders/?datasource=tranquility&order_type=${'buy'}&page=1&type_id=${itemID}`;

        buy_orders = await this.itemJSON(marketBuyOp, jita_station);
        sell_orders = await this.itemJSON(marketSellOp, amarr_station);
        // console.log(sell_orders);
        // await axios
        //     .get(marketBuyOp)
        //     .then(json => {
        //         for(let k in Object.values(json.data)){
        //             if(json.data[k]["location_id"] === jita_station)
        //                 buy_orders.push(json.data[k]);
        //         }
        //     })
        //     .then(() => {
        //         axios
        //             .get(marketSellOp)
        //             .then(response => {
        //                 // console.log("Object values", Object.values(json.data));
        //                 for(let k in Object.values(response.data)){
        //                     if(response.data[k]["location_id"] === amarr_station)
        //                         sell_orders.push(response.data[k]);
        //                 }
        //                 // info = new Item(buy_orders, sell_orders);
        //             })
        //             .then(() => {
        //                 console.log("Finished");
        //                 // return [buy_orders, sell_orders];
        //             });
        //     });

        // await axios
        //     .get(marketSellOp)
        //     .then(json => {
        //         // console.log("Object values", Object.values(json.data));
        //         for(let k in Object.values(json.data)){
        //             if(json.data[k]["location_id"] === amarr_station)
        //                 sell_orders.push(json.data[k]);
        //         }
        //         // info = new Item(buy_orders, sell_orders);
        //     })
        //     .then(() => {
        //         console.log("Finished");
        //         // return [buy_orders, sell_orders];
        //     });
        // console.log("Buy Orders", buy_orders);
        // console.log("Sell Orders", sell_orders);
        // console.log("returning");
        return [buy_orders, sell_orders];


    }



    async createAcceptableID(buy_id, sell_id) {
        // let intersection = buy_id.filter(x => sell_id.includes(x));
        // let info = [];
        let intersection = [ 39, 40, 35, 262, 33362, 586, 588, 33818, 1436, 1820, 3098, 3566, 3568, 33359, 3709, 5239, 14358, 5631, 6527, 6963, 6859, 9213, 42694, 10631, 11186, 11172, 11540, 11555, 11538, 11689, 11550, 12042, 11690, 12543, 12221, 12733, 45514, 12753, 45613, 45592, 45614, 45631, 14055, 14074, 47257, 47778, 47782, 47790, 47754, 47763, 47797, 47821, 47890, 47904, 47975, 15757, 16275, 16262, 16347, 16523, 16682, 16683, 17205, 17204, 17619, 17794, 18624, 14049, 33361, 19235, 19814, 20010, 20414, 20420, 21079, 20022, 21904, 23163, 23160, 23161, 25606, 26252, 27435, 27447, 28294, 47896, 29340, 29984, 30372, 30744, 30745, 30746, 30747]
        let arr = [];
        let good_id = [];
        // console.log(intersection);
        this.setState({acceptableID: intersection});
        for(let i = 0; i < intersection.length; i++) {
            let id = intersection[i];
            let info = await this.marketInfo(jita_region, intersection[i]);
            // console.log(info)
            let newItem = new Item(id,info[0],info[1]);
            if(newItem.returnQuantity() > 0) {
                console.log("intersection");
                arr.push(newItem);
                good_id.push(id);
            }
            if ((i % 100) === 0){
                console.log("I:",i);
                // good_id.push(id);
            }
            // console.log("after")
        }
        console.log("Info ",good_id);
        this.setState({applicable_orders: arr, done: true});
    }
    createHTML(item, index){
        item.createProfit();
        let id = item.returnTypeID();
        id.toString();
        let quan = item.returnQuantity();
        quan.toString();
        let flipCardStyle = card.flipCard;
        let flipCardInner = card.flipCardInner;
        let flipCardFront = card.flipCardFront;
        let flipCardBack = card.flipCardBack;
            console.log(typeof (id));
            return (
                <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                    <CardTitle src = {image} expand style={{
                        height:'200px',
                        color: '#fff',
                        background: `url(${image})`
                        }}
                    >

                        Update
                    </CardTitle>
                    <CardText>
                        <div>{id}</div>
                        <div>{quan}</div>

                    </CardText>
                    {/*<CardText>{quan}</CardText>*/}
                </Card>
                // <div className={card.flipCard} id = {index}>
                //     <div className={card.flipCardInner}>
                //         <div className={card.flipCardFront}>
                //             <img src={image}
                //             alt="Avatar"
                //             style={{
                //                 "width": "300px",
                //                 "height": "300px"
                //             }}/>
                //         </div>
                //         <div className={card.flipCardBack}>
                //             <h1>{id}</h1>
                //             <p>{quan}</p>
                //             {/*<p>${item.returnTotalProfit}</p>  */}
                //         </div>
                //     </div>
                // </div>
        )



    }

    render(){
        const dataArray = this.state.applicable_orders;
        // console.log("Data Array",dataArray);

        const info = dataArray.map( (data, idx) => {
            return this.createHTML(data, idx);
        });
        // console.log("Data Array",dataArray);
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
                        {info}
                        {/*{dataArray.map(data => <div>{console.log(data)}</div>)}*/}
                    </div>

                )
            }
    }
}
export default StationBuySellFunctions;