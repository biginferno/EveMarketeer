import React, {Component} from "react";
const axios = require('axios').default;

class StationBuySellFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptableID: [],
            done: false


        }

    }

    componentDidMount(){
        let buyID = this.props.buyID;
        let sellID = this.props.sellID;
        // console.log(buyID.length);
        let intersection = buyID.filter(x => sellID.includes(x));
        this.setState({acceptableID: intersection, done:true});

    }
    render(){
        if(!(this.state.done)) {
            return (
                //Show previous
                <div>
                    Users Loading
                </div>
            )
        }
        else
            {
                return (
                    <div>{console.log("This is our correct one ", this.state.acceptableID)}</div>

                )
            }
    }
}
export default StationBuySellFunctions;