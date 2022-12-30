import React, {useEffect, useState} from "react";
import axios from "axios";

import { Tabs, Tab } from "react-mdl";

import MarketView from './MarketView'
import RouteView from "./RouteView/routeView";
import StationView from './Stations'

import DefaultLoading from "./DefaultLoading/DefaultLoading";

function Market() {
    const [regionInfo, setRegionInfo] = useState({
        initialLode: false,
        buyOrders: {},
        sellOrders: {}
    })
    const [currentTab, setCurrentTab] = useState(0);

    const toggleCurrentTab = () => {
        switch(currentTab) {
            case 0:
                return <MarketView/>
            case 1:
                return <RouteView/>
            case 2:
                return <StationView/>
            default: 
                return <div>Tab Component Broken</div>
                
        }
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
            {regionInfo.initialLode 
                ? <div>
                    <Tabs activeTab={currentTab} onChange={(tabId) => setCurrentTab(tabId)} ripple>
                        <Tab>Market View</Tab>
                        <Tab>Route View</Tab>
                        <Tab>Station View</Tab>
                    </Tabs>
                    {toggleCurrentTab()}
                  </div>
                : <div>
                    <DefaultLoading/>
                  </div>

            }
            
        </div> 
    );       
}
export default Market;
























