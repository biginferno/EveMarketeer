import React, {Component} from "react";
const axios = require('axios').default;




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
        this.state.itemID.forEach(item => string += '<div>'+ item + '</div>');
        return(

            string
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