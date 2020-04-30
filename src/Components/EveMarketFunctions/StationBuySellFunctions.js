import React, {Component} from "react";
const axios = require('axios').default;

class StationBuySellFunctions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buy_id: [],
            sell_id: [],
            acceptableID: [],
            done: false


        }

    }

    componentDidMount(){

        // console.log("Buy ID",this.state.buy_id);
        // console.log(this.state.buy_id.length);
        // this.state.buy_id.forEach(element => console.log("Element",element));

        // let intersection = buyID.filter(x => sellID.includes(x));
        // console.log(this.state.acceptableID);
        this.setState({buy_id:this.props.buyID, sell_id:this.props.sellID, done:true});
        this.createAcceptableID(this.state.buy_id, this.state.sell_id);
        this.setState({ done:true});

    }
    componentDidUpdate(prevProps, prevState, snapshot)
     {
        if(prevProps.buyID !== this.props.buyID || prevProps.sellID !== this.props.sellID){
            this.setState({buy_id: this.props.buyID, sell_id:this.props.sellID});
            // console.log(this.state.buy_id.length)
        }
         // console.log(this.state.buy_id.length)
        this.createAcceptableID(this.state.buy_id, this.state.sell_id);

    }

    createAcceptableID(buy_id, sell_id) {
            // buy_id.forEach(element => console.log(element));

            // console.log("Object Type", typeof (buy_id));
            // console.log("Object Length", buy_id.length);
            // console.log("Object Keys", Object.keys(buy_id));
            // console.log("Object values", Object.values(buy_id));
            // console.log("Object entries", Object.entries(buy_id));
            console.log("Object", buy_id);
        console.log("Object", sell_id);

        let intersection = buy_id.filter(x => sell_id.includes(x));
            console.log(intersection)
            // for( let i in buy_id){
            //     // console.log(buy_id[i])
            // }

        // for(const x in buy_id){
        //     console.log(x);
        //
        // }

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
                    <div>Loaded
                        {
                            // console.log("This is our correct one ", this.state.buy_id)
                        }
                    </div>

                )
            }
    }
}
export default StationBuySellFunctions;