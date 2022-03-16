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
import ItemList from "./ItemList/itemlist";
import Statisics from "./Statistics/statistics";
import FreighterHaul from "./FreighterHaul/freighterhaul";
import {stations, freighters} from './Market'

import {trimmingFunction, getAllMarketOrders, sortInfo} from "../EveMarketFunctions/StationBuySellFunctions";
import JitaComponent from "../Stations/Jita";


function MarketView(...props) {
    const buyIDRef = useRef();
    const sellIDRef = useRef();
    //Station/Freighter Info
    const buy_info = stations[props[0].options.buy_station];
    
    const sell_info = stations[props[0].options.sell_station];
    const freighter = freighters[props[0].options.freighter];

    //Order Info
    const [buy_orders, setBuyOrders] = useState({})
    const [sell_orders, setSellOrders] = useState({})
    const [items, setItems] = useState({})
    
    
    // console.log("Buy ORders",buy_orders)
    useEffect(() => {
        async function getBuyOrders() {
            if(buyIDRef.current !== buy_info.id){
                const buy_orders_response = await getAllMarketOrders(buy_info.region, 'sell')
                
                if(buy_orders_response) {
                    const buy_order = await sortInfo(buy_orders_response)

                    if(buy_order) {
                        setBuyOrders({
                            orders:buy_order, 
                            isBuyLoaded:true
                        })
                        buyIDRef.current = buy_info.id
                        console.log("Responsessss", buy_orders)
                        setItems({isTrimmed:false})
                    }
                }
            }
        }
        getBuyOrders()
    },[buy_info.id])

    useEffect(() => {
        async function getSellOrders() {
            if(sellIDRef.current !== sell_info.id) {
                const sell_orders_response = await getAllMarketOrders(sell_info.region, 'buy');

                if(sell_orders_response){
                    // console.log("Response", sell_orders_response)
                    const sell_order = await sortInfo(sell_orders_response)

                    if(sell_order){
                        console.log("Response", sell_order)
                        setSellOrders({
                            orders:sell_order, 
                            isSellLoaded:true
                        })
                        console.log("Responses", sell_orders)
                        sellIDRef.current = sell_info.id
                        setItems({isTrimmed:false})
                    }
                }
            }
        }
        getSellOrders()
    },[sell_info.id])



    // console.log(typeof(buy_market_orders))
    // console.log(sell_market_orders)
    
    
    //Remember old values, only change orders if needed
    
    //This useEffect should reset our market info and gather the necessary orders, will only be called if use wants a different market route
    //SOLVED: (buy_info,sell_info,freighter_m3) IS NULL and cannot be compared in current useEffect


    // This useEffect should recalculate our good market transactions, will only be called if the orders get changed
    useEffect(()=>{
        async function trimming() {
            console.log("Buy", buy_orders.isBuyLoaded, " Sell", sell_orders.isSellLoaded)
            if(buy_orders.isBuyLoaded && sell_orders.isSellLoaded){
                const [trimmedItems] = await trimmingFunction(buy_orders.orders, buy_info.station, sell_orders.orders, sell_info.station)
                
                if(trimmedItems) {
                    // console.log("Trimmed ITems",trimmedItems)
                    await setItems({
                        items:trimmedItems,
                        isTrimmed:true
                    })

                }

                
            }
        }
        trimming()

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[buy_orders.isBuyLoaded, sell_orders.isSellLoaded])

    // TODO: 
    // TEST JITA TO AMARR MARKET PROFIT
    // Create Cards/Table forItemList
    // Pass Statistic Info to Statistics function
    // Calculate optimal Freighter Haul
    // Create refresh functionality
    // Style components
    // Cleanup code(lmao yea right)
    return(
        {items.isTrimmed && items.items &&
        <div className="marketview">
            
            <div className="itemlist"><ItemList/></div>
            <div className="statistics"><Statisics/></div>
            <div className="freighterhaul"><FreighterHaul/></div>
            
            {/* <JitaComponent/> */}
        </div>
        }
    )

}

export default MarketView;