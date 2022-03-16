import React, { Component } from "react";
import Item from "../EveMarketFunctions/ItemInfo";
import { Card, CardTitle, CardText } from "react-mdl";
const axios = require("axios").default;

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
      items: [],


      sell_region: 10000043,
      sell_station: 60008494,

      buy_done: false,
      sell_done: false,
      updated_info: false,
      sorted: false,
      trimmed: false,
    };
  }
  async componentDidMount() {
    let jita = this.state.jita_region;
    let sell = this.state.sell_region;
    await this.getAllMarketOrders(jita, "sell").then((response) => {
      this.setState({
        all_buy_orders: response,
        buy_done: true,
      });
    });
    await this.getAllMarketOrders(sell, "buy").then((response) => {
      this.setState({
        all_sell_orders: response,
        sell_done: true,
      });
    });
    this.sortInfo();
  }
  trimmingFunction() {
    //Grab Sell orders and Buy Orders for each ID and create an Item Object
    let sell_orders = this.state.all_sell_orders;
    let buy_orders = this.state.all_buy_orders;
    let item_list = [];
    let jita_station = this.state.jita_station;
    let amarr_station = this.state.amarr_station;

    while (sell_orders.length > 0) {
      //Reset Initializations
      //Starting with the front of our sell_orders, this matters most because we can
      //only BUY what we can SELL

      //current_id represents the current sell_id we are going to work with
      let current_id = sell_orders[0]["type_id"];
      //at the start our next_id is the same because we want to start by pushing the
      //first order in our array
      let next_sell_id = current_id;

      //Initialize two arrays for the Item Object, these should have the same id we will buy
      let current_sell_orders = [];
      let current_buy_orders = [];

      //Collect the sell_orders
      while (current_id === next_sell_id) {
        if (sell_orders[0]["location_id"] === amarr_station) {
          current_sell_orders.push(sell_orders[0]);
        }
        sell_orders.shift(0);
        if (sell_orders.length > 0) {
          next_sell_id = sell_orders[0]["type_id"];
        } else break;
      }
      //next_buy_id will be the front of our buy_orders array
      //(1) if next_buy_id < current_id then we have don't have buy orders at sell_location and need to remove until we are up to or past our current_id
      //(2) if these two are equal, we push until the next_buy_id doesn't equal current_id i.e we have a different item
      //(3) if next_buy_id > current_id, we don't have any
      //(4) if we have have no more orders we are done with this function

      //Option 4
      if (buy_orders.length <= 0) {
        //No more buy orders
        return item_list;
      }
      let next_buy_id = buy_orders[0]["type_id"];
      //Option 1
      if (next_buy_id < current_id) {
        while (next_buy_id < current_id) {
          if (buy_orders.length > 0) {
            buy_orders.shift();
            try{
              next_buy_id = buy_orders[0]["type_id"];
            }
            catch{
              console.log(buy_orders[0])
            }
            
          } else break;
        }
      }
      //If option 1 is called and successful, the buy_orders should be on or above the sell_order id
      //(1) if it is at the same as the current_id we have an item with possible order profitability which we must save
      //(2) if the id is above, we shouldn't push anything to the Item Array i.e no orders

      //Option 2
      if (next_buy_id === current_id) {
        while (current_id === next_buy_id) {
          if (buy_orders[0]["location_id"] === jita_station) {
            current_buy_orders.push(buy_orders[0]);
          }
          buy_orders.shift(0);
          if (buy_orders.length > 0) {
            next_buy_id = buy_orders[0]["type_id"];
          } else break;
        }
        //Option 3 we don't do anything because we need to move on with the sell_orders, these buy_orders could be used later
      }
      if (current_buy_orders.length > 0 && current_sell_orders.length > 0) {
        item_list.push(
          new Item(current_id, current_buy_orders, current_sell_orders)
        );
      } else {
      }
    }
    return item_list;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.buy_done !== this.state.buy_done &&
      prevState.sell_done !== this.state.sell_done
    ) {
      //Initial call to grab info is completed, we need to create items
      this.sortInfo();
    }
    if (prevState.sorted !== this.state.sorted && this.state.sorted === true) {
      let item_list = this.trimmingFunction();
      this.setState({
        items: item_list,
        trimmed: true,
      });
    }
  }
  async getAllMarketOrders(region, type) {
    let finalList = [];
    let pages = 0;
    let currentPage = 1;
    console.log(`Starting ${type} process`);
    let region_buy_id = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
    await axios.get(region_buy_id).then((json) => {
      pages = json.headers["x-pages"];
      console.log("Pages", pages);
      for (let k in Object.values(json.data)) {
        finalList.push(json.data[k]);
      }
      currentPage++;
    });
    while (currentPage <= pages) {
      let region_buy_id = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
      await axios.get(region_buy_id).then((json) => {
        for (let k in Object.keys(json.data)) {
          finalList.push(json.data[k]);
        }
      });
      currentPage++;
    }
    return finalList;
  }
  sortInfo() {
    let buy_info = this.state.all_buy_orders;
    let sell_info = this.state.all_sell_orders;
    buy_info.sort(function (a, b) {
      return a["type_id"] - b["type_id"];
    });
    sell_info.sort(function (a, b) {
      return a["type_id"] - b["type_id"];
    });
    console.log("Done with sorting");
    this.setState({
      sorted: true,
      all_buy_orders: buy_info,
      all_sell_orders: sell_info,
    });
  }




  
  createHTML(item) {
    let id = item.returnTypeID().toString();
    let quan = item.returnQuantity().toString();
    let profit = item.returnTotalProfit();
    const icon = `https://images.evetech.net/types/${id}/icon`;
    console.log("Making HTML for:", item)
    const alt = `eve id ${id}`;
    return (
      <Card
        shadow={0}
        style={{ 
          width: "160px", 
          height: "160px", 
          float: "left",
          border:"thin", 
          background:"green" 
        }}
      >
        <CardTitle
          expand
          style={{
            height: "100px",
            color: "#fff",
            background: "red",
          }}
        >
          <img src={icon} alt={alt} width="100%" height="100%" />
        </CardTitle>
        <CardText>
          <div>Id: {id}</div>
          <div>Quantity to buy: {quan}</div>
          <div>Total Profit: {profit}</div>
        </CardText>
      </Card>
    );
  }
  render() {
    let sorted = this.state.sorted;
    let trimmed = this.state.trimmed;
    if (!sorted) {
      return <div>JitaComponent</div>;
    } else {
      if (!trimmed) {
        return <div>Sorted Complete</div>;
      } else {
        let all_items = this.state.items;
        let profitable = 0;
        const item_jsx = all_items.map((item) => {
          let item_info = item;
          if (item_info.returnTotalProfit() > 0) {
            console.log("item,",item)
            profitable++;
            console.log("Total number of profitable orders: ", profitable);
            return this.createHTML(item_info);
          }
        });
        return item_jsx;
      }
    }
  }
}
export default JitaComponent;