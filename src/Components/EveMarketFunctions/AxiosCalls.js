const axios = require('axios').default;
//Eve ID
//Jita
const jita_region = 10000002;
const jita_station = 30000142;

//Amarr
const amarr_region = 10000043;
const amarr_station = 30002187;

//Eve Routes
let current_buy_region = jita_region;
let current_sell_region = amarr_region;


export async function itemID(finalList, region){
    // console.log("Finished", finished);
    let pages = 0;
    let currentPage = 1;
    let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;

    await axios
        .get(region_buy_id)
        .then(json => {
            pages = json.headers['x-pages'];
            console.log(json.data);
            Array.prototype.push.apply(finalList, json.data);
            console.log(finalList[0]);
            currentPage++;
            // console.log(currentPage);
            while(currentPage <= pages) {
                // console.log(currentPage);
                let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;
                axios.get(region_buy_id)
                    .then((json) => {
                        Array.prototype.push.apply(finalList, json.data);
                        console.log(finalList[0]);

                    });
                currentPage++;
            }
        })
        .catch((error) => {
            //Handle Errors
        });

    return true;
    // console.log(currentPage);
}
function concatenateItemID(finalList, data){
    finalList.concat(data);
}

export function marketInfo(itemID, orderType,region){
    let station = 0;
    switch(region){
        case 10000002:
            orderType = 'buy';
            station = jita_station;
            break;
        case 10000043:
            orderType = 'sell';
            station=amarr_station;
            break;
        default:
            break;
    }

    const marketBuyOp = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${orderType}&page=1&type_id=${itemID}`;



}
