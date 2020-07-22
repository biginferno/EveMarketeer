import React, { Component } from "react";
import * as api from "../EveMarketFunctions/AXIOS"

class JitaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jita_region: 10000002,
            jita_station: 60003760,

            amarr_region: 10000043,
            amarr_station: 60008494,

            all_buy_orders: [],
            all_sell_orders: [],

            sell_region: 10000043,
            sell_station: 60008494,

            initial_info: false,
            updated_info: false,
            sorted: false,
            trimmed: false
        }
    }
    async componentDidMount() {
        let buy_info = [];
        let sell_info = [];
        // console.log("here")
        buy_info = await api.getAllMarketOrders(this.state.jita_region,"sell");
        console.log("second")
        sell_info = await api.getAllMarketOrders(this.state.sell_region,"buy");
        console.log(buy_info)
        this.setState = ({
            inital_info: true,
            all_buy_orders: buy_info,
            all_sell_orders: sell_info
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Prevstate initial_info", this.state.inital_info)
        if (prevState.inital_info !== this.state.inital_info || (this.state.buy_info.length !== 0 && this.state.sell_info.length !== 0)) {
            console.log("Updating");
            //Initial call to grab info is completed, we need to create items
            this.sortInfo();
        }
        if (prevState.updated_info !== this.state.updated_info) {
            //This should be called if we change stations we are looking at
            this.sortInfo();
        }
    }
    sortInfo() {
        console.log("here")
        let buy_info = this.state.all_buy_orders;
        let sell_info = this.state.all_sell_orders;
        buy_info.sort(function (a, b) {
            return a["item_id"] - b["item_id"];
        });
        sell_info.sort(function (a, b) {
            return a["item_id"] - b["item_id"];
        });
        console.log("here")
        // console.log(buy_info)
        // console.log("here")
        this.setState = ({
            all_buy_orders: buy_info,
            all_sell_orders: sell_info,
            sorted: true
        })
    }
    render() {
        let sorted = this.state.sorted;
        console.log(sorted);
        if (!sorted) {
            return (
                <div>JitaComponent</div>
            )
        }
        else {
            return (
                <div>Sorted Complete</div>
            )
        }
    }
}
export default JitaComponent;