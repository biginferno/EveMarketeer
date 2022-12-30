// 
// 
// 

import React, {useEffect, useState} from "react";
import axios from "axios";

import Toolbar from '../../Toolbar/toolbar';
import MarketView from './MarketView'

function Market() {
    const [regionInfo, setRegionInfo] = useState({
        initialLode: false,
        buyOrders: {},
        sellOrders: {}
    })
    const [options, setOptions] = useState({});

    const handleToolbarCallback = (options) => {
        setOptions({
            ...options
        });
    }

    useEffect(() => {
        async function grabAllRegionInfo() {
            let allRegions = await axios.get("http://localhost:5000/market/all", {
                method:'get',
                headers: {
                    "Content-type": "application/json"
                }
            })

            setRegionInfo({
                initialLode: true,
                buyOrders: allRegions.data.buyOrders,
                sellOrders: allRegions.data.sellOrders
            })
        }
        grabAllRegionInfo()
    },[])

    return(
        <div className="market" style={{"height":"auto"}}>
            <Toolbar toolbarCallback={handleToolbarCallback}/>
            {regionInfo.initialLode
               ? <MarketView regionInfo={regionInfo}/>
               : <div>Please Select Your Stations and Freighter</div>
            }
        </div> 
    );       
}
export default Market;
























