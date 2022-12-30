import React from "react";
import './statistics.css'
// 2. (Widget) Statistcs relating to total profit to be made/m3/isk per jump
function Statisics(...props){
    
    const real_props = props[0];
    console.log("Statistic Props:", real_props)
    const isk_per_m3 = (real_props.total_profit / real_props.total_m3).toLocaleString("en-US");
    return(
        <div className="statistics">
            {/* <div className="statistics-title">Statisics</div> */}
            <div className="station-route">
                <h4>Station Route</h4>
                <h4>{real_props.buy_station + " ==> " + real_props.sell_station}</h4>
            
            </div>
            <div className="total-profit"><h4>Total Profit</h4><h6>{(real_props.total_profit).toLocaleString("en-US")}</h6></div>
            <div className="total-m3"><h4>Total m3</h4><h6>{(real_props.total_m3.toLocaleString("en-US"))}</h6></div>
            <div className="isk-calculations">
                <div className="isk-per-m3"><h5>ISK PER M3</h5><h6>{isk_per_m3}</h6></div>
                <div className="isk-per-jump"><h5>ISK Per Jump</h5><h6>ISKS</h6></div>
            </div>
        </div>
    )
}

export default Statisics;