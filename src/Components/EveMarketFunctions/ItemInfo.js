
export default class Item {
    constructor(id,buy_info, sell_info){
        this.id = id;
        this.buy_info = buy_info;
        this.sell_info = sell_info;

        this.info = profit_quantity_calculator(this.buy_info, this.sell_info);
        this.quantity = this.info[0];
        this.total_profit = this.info[1];
    }
    returnTotalProfit(){
        return this.total_profit;
    }
    returnFinalList(){
        return this.info;
    }
    returnTypeID(){
        // console.log("Buy info",this.buy_info);
        return this.id;
    }
    setQuantity(q){
        this.quantity = q;
    }
    returnQuantity () {
        return this.quantity;
    };
    createProfit(){
        this.info = profit_quantity_calculator(this.buy_info, this.sell_info);
    }
}

function profit_quantity_calculator(jita_sellable, amarr_buyable){

    let length_jita = jita_sellable.length;
    let length_amarr = amarr_buyable.length;
    jita_sellable.sort(function(a,b){
        return a["price"] - b["price"];
    });
    amarr_buyable.sort(function(a,b){
        return b["price"] - a["price"];
    });
    // console.log(length_amarr)
    // console.log("Jita Orders", jita_sellable);
    // console.log("Amarr Orders", amarr_buyable);
    return profit_quantity_calculator_helper(jita_sellable, amarr_buyable, length_jita, length_amarr, 0, 0)
}
function profit_quantity_calculator_helper(jita_orders, amarr_sellable, length_jita, length_amarr, quantity, total_profit){

    if(length_jita > 0 && length_amarr > 0) {

        let jita_quantity = jita_orders[0]['volume_remain'];
        let jita_price = jita_orders[0]['price'];
        let amarr_quantity = amarr_sellable[0]['volume_remain'];
        let amarr_price = amarr_sellable[0]['price'];
        let quantity_difference = jita_quantity - amarr_quantity;
        let price_difference = 0;
        price_difference = amarr_price - jita_price;


        if(price_difference > 0){

            let buy_total =  amarr_sellable[0]['volume_remain'] * jita_price;
            let sell_total = amarr_sellable[0]['volume_remain'] * amarr_price;
            if(quantity_difference > 0) {


                quantity += amarr_sellable[0]['volume_remain'];
                // console.log( "Before",jita_orders[0]['volume_remain']);
                jita_orders[0]['volume_remain'] = jita_quantity - amarr_quantity;
                // console.log( "After",jita_orders[0]['volume_remain']);

                total_profit += sell_total - buy_total;
                amarr_sellable.shift();

                return profit_quantity_calculator_helper(jita_orders, amarr_sellable, length_jita, length_amarr - 1, quantity, total_profit)
            }
            else if(quantity_difference < 0){

                quantity += jita_orders[0]['volume_remain'];

                amarr_sellable[0]['volume_remain'] = amarr_quantity - jita_quantity;

                total_profit += sell_total - buy_total;
                jita_orders.shift();

                return profit_quantity_calculator_helper(jita_orders, amarr_sellable, length_jita - 1, length_amarr, quantity, total_profit);

            }
            else {


                quantity += jita_quantity;
                total_profit += sell_total - buy_total;
                jita_orders.shift();
                amarr_sellable.shift();
                return profit_quantity_calculator_helper(jita_orders, amarr_sellable, length_jita - 1, length_amarr - 1, quantity, total_profit);

            }
        }else {
            return [quantity, total_profit];
        }
    }
    else {

        return [quantity, total_profit];
    }
}

