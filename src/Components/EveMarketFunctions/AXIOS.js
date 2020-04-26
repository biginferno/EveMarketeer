import React, {Component} from "react";
const axios = require('axios').default;

//Eve ID
//Jita
const jita_region = 10000002;
const jita_station = 30000142;

//Amarr
const amarr_region = 0;
const amarr_station = 0;

//Eve Routes
let current_buy_region;
let current_sell_region;
let order_type;
let type_id;

const buy_order = `buy`;
const sell_order = `sell`;

const marketBuyOp = `https://esi.evetech.net/v1/markets/${current_buy_region}/orders/?datasource=tranquility&order_type=${order_type}&page=1&type_id=${type_id}`;

class UsersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: [],
            done: false
        }
    }
    componentDidMount() {
        axios.get(` https://esi.evetech.net/latest/markets/groups/?datasource=tranquility`)
            .then(json => this.setState({ itemID: json.data, done: true }))

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
        if(!this.state.done) {
            return (
                <div>
                    Users Loading
                </div>
            )
        } else {
            return (
                <div>{this.returnUsers()}
                </div>
                // <div>
                //
                //     Users: {this.state.users}
                // </div>
            )
        }
    }
}

export default UsersComponent;