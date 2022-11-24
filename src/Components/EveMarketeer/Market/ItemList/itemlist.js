import React from "react";
import './itemlist.css'

import { Card, CardTitle, CardText } from 'react-mdl';


function ItemList(...props){
    console.log("Item Props:", props)
    const items = props[0].items;
    const item_map = items.map((item) =>{
        return createHTML(item)
    })
    
    return(
        <div className="itemlist">
            {item_map}
        </div>
    )
}

function createHTML(item) {
    let id = item.returnTypeID().toString();
    let quan = item.returnQuantity().toString();
    let profit = Math.floor(item.returnTotalProfit() *100) / 100;
    const icon = `https://images.evetech.net/types/${id}/icon`;
    // console.log("Making HTML for:", item)
    const alt = `eve id ${id}`;
    return (
      <Card className="card">
        <CardTitle className="card-title">
          <img className="item-image" src={icon} alt={alt}/>
        </CardTitle>
        <CardText className="card-text">
          <div>Id: {id}</div>
          <div>Quantity: {quan}</div>
          <div>Total Profit: {profit}</div>
        </CardText>
      </Card>
    );
  }
export default ItemList; 