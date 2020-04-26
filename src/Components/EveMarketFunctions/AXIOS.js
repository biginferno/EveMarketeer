import React, {Component} from "react";
const axios = require('axios').default;

//Eve ID
//Jita
const jita_region = 10000002;
const jita_station = 30000142;
//Eve Routes
const marketOp = `https://esi.evetech.net/v1/markets/${jita_region}/orders/?datasource=tranquility&order_type=buy&page=1&type_id=1`;

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
            .then(this.returnUsers(), )
    }
    returnUsers(){
        let string = '';
        this.state.itemID.forEach(item => string += `<div>`+ item + '</div>');
        console.log(this.state.itemID)
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
                <div>{this.returnUsers()}</div>
                // <div>
                //
                //     Users: {this.state.users}
                // </div>
            )
        }
    }
}

export default UsersComponent;