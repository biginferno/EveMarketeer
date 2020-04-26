import React, {Component} from "react";
import {Tabs, Tab, Grid, Cell, Card, CardTitle,CardText, CardActions, Button, CardMenu, IconButton} from "react-mdl";



/*
jita_region_id = 10000002
amarr_region_id = 10000043
*/
class BuyStation extends Component {
    constructor(props) {
        super(props);

        this.state= {
            station_id:0,
            region_id:0,
            s_id:0
        };
    }

    toggleStation(){
        switch(this.state.s_id) {
            //Jita State
            case 0:
                this.setState({region_id : 30000142});

                break;

            case 1:
                this.state.region_id = 2;

                break;


            default:
                this.state.region_id = 0

        }
    }

    render() {
        return(

            <div className="category-tabs">
                <Tabs activeTab={this.state.s_id} onChange={(tabId) => this.setState({s_id: tabId})} ripple>

                    <Tab>Jita</Tab>


                </Tabs>

                <Grid >
                    <Cell col={12}>
                        <div className="content"> {this.toggleStation()}</div>
                    </Cell>
                </Grid>

            </div>
        )
    }

}

export default BuyStation;
