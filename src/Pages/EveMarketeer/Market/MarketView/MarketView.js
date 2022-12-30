// MarketView takes props from Market with station info's and freighter info and displays statistics related 
// to market profitibility

/**
 * Initial Three Categories for View
 * 1. (Table/Cards) Item List of profitable orders
 * 2. (Widget) Statistcs relating to total profit to be made/m3/isk per jump
 * 3. (Widget/Table) Calculate optimal freighter hauls(most isk/m3)
 */
import React, {useEffect, useRef, useState} from "react";
import './MarketView.css'

import Toolbar from '../../Toolbar/toolbar';
import ItemList from "../ItemList/itemlist";
import Statisics from "./Statistics/statistics";
import FreighterHaul from "./FreighterHaul/freighterhaul";
import {stations, freighters} from './Market'

import {trimmingFunction, getAllMarketOrders, sortInfo, sortItems} from "../EveMarketFunctions/StationBuySellFunctions";


function MarketView(...props) {
    const buyIDRef = useRef();
    const sellIDRef = useRef();
    const buyOrdersRef = useRef({})
    const sellOrdersRef = useRef({})

    //Station/Freighter Info
    const buy_info = stations[props[0].options.buy_station];
    
    const sell_info = stations[props[0].options.sell_station];
    const freighter = freighters[props[0].options.freighter];
    
    console.log("sell info:",typeof(props[0].options.buy_station));

    //Order Info
    const [buy_orders, setBuyOrders] = useState({
        orders:{}, 
        isBuyLoaded:false
    })
    const [sell_orders, setSellOrders] = useState({
        orders:{}, 
        isSellLoaded:false
    })
    const [items, setItems] = useState({
        items: {},
        isTrimmed: false,
        total_profit: 0,
        total_m3: 0,
        top_twenty_orders: {}
        
    })
    
    
    // console.log("Buy ORders",buy_orders)
    useEffect(() => {
        async function getBuyOrders() {
            if(buyIDRef.current !== buy_info.id) {
                setBuyOrders({
                    isBuyLoaded:false
                })
                const buy_orders_response = await getAllMarketOrders(buy_info.region, 'sell')
                
                if(buy_orders_response) {
                    const buy_order = await sortInfo(buy_orders_response)

                    if(buy_order) {
                        setBuyOrders({
                            orders:buy_order, 
                            isBuyLoaded:true
                        })
                        buyIDRef.current = buy_info.id
                        buyOrdersRef.current  = buy_order
                        console.log("Responsessss", buy_orders)
                        setItems({isTrimmed:false})
                    }
                }
            }
            else {
                setBuyOrders({
                    orders: buyOrdersRef.current, 
                    isBuyLoaded:true
                })
            }
        }
        getBuyOrders()
    },[buy_info.id, sell_info.id])

    useEffect(() => {
        async function getSellOrders() {
            if(sellIDRef.current !== sell_info.id) {
                setSellOrders({isSellLoaded:false})
                const sell_orders_response = await getAllMarketOrders(sell_info.region, 'buy');

                if(sell_orders_response){
                    // console.log("Response", sell_orders_response)
                    const sell_order = await sortInfo(sell_orders_response)

                    if(sell_order) {
                        console.log("Response", sell_order)
                        setSellOrders({
                            orders:sell_order, 
                            isSellLoaded:true
                        })
                        // console.log("Responses", sell_orders)
                        sellIDRef.current = sell_info.id
                        sellOrdersRef.current = sell_order
                        setItems({isTrimmed:false})
                    }
                }
            }
            else { 
                setSellOrders({
                    orders:sellOrdersRef.current, 
                    isSellLoaded:true
                })
            }
        }
        getSellOrders()
    },[buy_info.id, sell_info.id])
    //Remember old values, only change orders if needed
    
    // This useEffect should reset our market info and gather the necessary orders, will only be called if use wants a different market route
    // SOLVED: (buy_info,sell_info,freighter_m3) IS NULL and cannot be compared in current useEffect
    // This useEffect should recalculate our good market transactions, will only be called if the orders get changed
    useEffect(()=>{       
        async function trimming() {
            console.log("Buy", buy_orders.isBuyLoaded, " Sell", sell_orders.isSellLoaded, !items.isTrimmed)
            if(buy_orders.isBuyLoaded && sell_orders.isSellLoaded && !items.isTrimmed){
                const trimmedItems = trimmingFunction(buy_orders.orders, buy_info.station, sell_orders.orders, sell_info.station)
                if(trimmedItems) {
                    // console.log("Trimmed ITems",trimmedItems)

                    const item_info = sortItems(trimmedItems);
                    console.log(item_info)
                    setItems({
                        buy_station: props[0].options.buy_station,
                        sell_station: props[0].options.sell_station,
                        freighter: props[0].options.freighter,
                        items:item_info[0],
                        total_profit: item_info[1],
                        total_m3: item_info[2],
                        isTrimmed:true
                    })
                }
            }
        }
        trimming()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[buy_orders.isBuyLoaded, sell_orders.isSellLoaded, items.isTrimmed])


    
    if(buy_orders.isBuyLoaded && sell_orders.isSellLoaded && items.isTrimmed) {
        return(

            <div className="marketview">
                <ItemList items={items.items}/>
                <Statisics buy_station={items.buy_station} sell_station={items.sell_station} total_profit={items.total_profit} total_m3={items.total_m3}/>
                <FreighterHaul freighter={freighter} total_m3={items.total_m3} top_20_items={items.top_20_items}/>
            </div>
        )
    }
    else {
        return(
            <div className="loading">
                <h1>Loading Information</h1>
            </div>)
        
    }

}

export default MarketView;