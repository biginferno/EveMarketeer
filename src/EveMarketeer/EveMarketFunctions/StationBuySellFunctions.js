import React, { Component } from "react";
import { Item } from "./ItemInfo";
import MarketItem from "./MarketItem";
import image from "./eve_image.jpg";
import { Card, CardTitle, CardText } from "react-mdl";
import * as card from "./flipcard.css";
const axios = require("axios").default;

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
      applicable_orders: [],
      acceptableID: [],
      done: false,
      total_profit: 0,
    };
  }

  componentDidMount() {
    this.setState(
      {
        buy_id: this.props.buyID,
        sell_id: this.props.sellID,
      },
      () => this.createAcceptableID(this.state.buy_id, this.state.sell_id)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.buy_id !== this.state.buy_id ||
      prevState.sell_id !== this.state.sell_id
    ) {
      // this.createAcceptableID(this.state.buy_id, this.state.sell_id);
    }
  }

  axiosCallNumber(i) {
    if (i % 100 === 0) {
      console.log("I:", i);
    }
  }

  createAcceptableID(buy_id, sell_id) {
    // let intersection = buy_id.filter((x) => sell_id.includes(x));

    let intersection = [33195, 33359, 648, 5599, 1355, 1405, 2344, 2358, 2655, 3810, 3822, 4051, 55319, 37135, 5091, 5093, 5175, 5177, 5871, 6635, 7247, 7493, 40464, 8531, 41471, 41507, 43699, 43701, 11399, 11465, 11540, 11725, 11735, 11739, 12044, 45612, 45616, 45618, 14055, 14098, 14292, 47733, 47748, 47871, 47888, 47890, 47892, 47929, 47933, 47975, 15331, 15479, 15923, 16273, 16275, 16640, 16670, 16672, 16680, 16681, 49742, 17175, 17471, 17895, 33332, 18590, 18676, 19081, 19209, 19285, 19970, 21029, 21364, 21588, 21592, 21729, 55303, 55299, 55305, 55306, 55318, 55323, 55587, 55599, 55658, 23073, 23158, 23416, 25597, 25616, 25887, 26328, 26388, 26390, 27377, 27405, 27417, 28262, 28363, 28366]

    this.setState({
      acceptableID: intersection,
      done: true,
    });
  }

  render() {
    if (!this.state.done) {
      return (
        //Show previous

        <div>Loading Item Numbers</div>
      );
    } else {
      const html = this.state.acceptableID.map((item) => {
        let market_info = (
          <MarketItem
            item_id={item}
            buy_station={jita_region}
            sell_station={amarr_region}
            key={item}
          />
        );

        if (market_info !== null) {
          return market_info;
        }
      });
      // console.log(html)

      return html;
    }
  }
}
export default StationBuySellFunctions;
