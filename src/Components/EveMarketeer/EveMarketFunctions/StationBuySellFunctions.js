import Item from "./ItemInfo";
const axios = require("axios").default;


// //Jita
// const jita_region = 10000002;
// const jita_system = 30000142;
// const jita_station = 60003760;

// //Amarr
// const amarr_region = 10000043;
// const amarr_system = 30002187;
// const amarr_station = 60008494;


export function trimmingFunction(all_buy_orders, buy_station_id, all_sell_orders, sell_station_id) {
  //Grab Sell orders and Buy Orders for each ID and create an Item Object
  let item_list = [];
  console.log("Trimming", all_buy_orders, all_sell_orders)

  while (all_sell_orders.length > 0) {
    
    //Reset Initializations
    //Starting with the front of our all_sell_orders, this matters most because we can
    //only BUY what we can SELL

    //current_id represents the current sell_id we are going to work with
    let current_id = all_sell_orders[0]["type_id"];
    
    //at the start our next_id is the same because we want to start by pushing the
    //first order in our array
    let next_sell_id = current_id;

    //Initialize two arrays for the Item Object, these should have the same id we will buy
    let current_sell_orders = [];
    let current_buy_orders = [];

    //Collect the all_sell_orders
    while (current_id === next_sell_id) {
      if (all_sell_orders[0]["location_id"] === sell_station_id) {
        current_sell_orders.push(all_sell_orders[0]);
      }
      all_sell_orders.shift(0);
      if (all_sell_orders.length > 0) {
        next_sell_id = all_sell_orders[0]["type_id"];
      } else break;
    }
    //next_buy_id will be the front of our all_buy_orders array
    //(1) if next_buy_id < current_id then we have don't have buy orders at sell_location and need to remove until we are up to or past our current_id
    //(2) if these two are equal, we push until the next_buy_id doesn't equal current_id i.e we have a different item
    //(3) if next_buy_id > current_id, we don't have any
    //(4) if we have have no more orders we are done with this function

    //Option 4
    if (all_buy_orders.length <= 0) {
      //No more buy orders
      return item_list;
    }
    let next_buy_id = all_buy_orders[0]["type_id"];
    //Option 1
    if (next_buy_id < current_id) {
      while (next_buy_id < current_id) {
        if (all_buy_orders.length > 0) {
          all_buy_orders.shift();
          try{
            next_buy_id = all_buy_orders[0]["type_id"];
          }
          catch{
            console.log(all_buy_orders[0])
          }
          
        } else break;
      }
    }
    //If option 1 is called and successful, the all_buy_orders should be on or above the sell_order id
    //(1) if it is at the same as the current_id we have an item with possible order profitability which we must save
    //(2) if the id is above, we shouldn't push anything to the Item Array i.e no orders

    //Option 2
    if (next_buy_id === current_id) {
      while (current_id === next_buy_id) {
        if (all_buy_orders[0]["location_id"] === buy_station_id) {
          current_buy_orders.push(all_buy_orders[0]);
        }
        all_buy_orders.shift(0);
        if (all_buy_orders.length > 0) {
          next_buy_id = all_buy_orders[0]["type_id"];
        } else break;
      }
    //Option 3 we don't do anything because we need to move on with the all_sell_orders, these all_buy_orders could be used later
    }
    if (current_buy_orders.length > 0 && current_sell_orders.length > 0) {
      // console.log("Making Item for ", current_id)
      item_list.push(
        new Item(current_id, current_buy_orders, current_sell_orders)
      );
    } else {
    }
  }
  return item_list;
}

export async function getAllMarketOrders(region, type) {
  let finalList = [];
  let pages = 0;
  let currentPage = 1;
  
  let region_orders = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
  await axios.get(region_orders).then((json) => {
    pages = json.headers["x-pages"];
    console.log("Pages", pages);
    for (let k in Object.values(json.data)) {
      finalList.push(json.data[k]);
    }
    currentPage++;
  });
  while (currentPage <= pages) {
    // console.log(`Starting ${type} process with ${pages - currentPage} left`);
    let region_orders = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
    await axios.get(region_orders).then((json) => {
      for (let k in Object.keys(json.data)) {
        finalList.push(json.data[k]);
      }
    });
    currentPage++;
  }
  // console.log("Market List ",type,finalList)
  return finalList;
}

export function sortInfo(orders) {
  orders.sort(function (a, b) {
    return a["type_id"] - b["type_id"];
  });
  console.log("Done with sorting", orders);
  return orders
}