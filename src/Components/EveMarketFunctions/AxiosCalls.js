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


export function itemID(finalList){

    let pages = 0;
    let currentPage = 1;
    let region_buy_id = `https://esi.evetech.net/latest/markets/${current_buy_region}/types/?datasource=tranquility&page=${currentPage}`;
    // let json = await axios.get(region_buy_id);
    axios.get(region_buy_id)
        .then(json => {
            pages= json.headers['x-pages'];

            finalList.push(json.data);
            currentPage++;
            // console.log(currentPage);
            while(currentPage <= pages) {
                // console.log(currentPage);
                let region_buy_id = `https://esi.evetech.net/latest/markets/${current_buy_region}/types/?datasource=tranquility&page=${currentPage}`;
                axios.get(region_buy_id)

                    .then((json) => {

                        finalList.push(json.data);

                    });
                currentPage++;

            }
            // return finalList;
        });
    console.log(currentPage);



}
function concatenateItemID(finalList, data){
    finalList.concat(data);
}
