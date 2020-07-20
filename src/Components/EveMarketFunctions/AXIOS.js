const axios = require("axios").default;

export async function getAllItemID(region) {
  let finalList = [];
  let pages = 0;
  let currentPage = 1;

  let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;

  await axios.get(region_buy_id).then((json) => {
    pages = json.headers["x-pages"];
    for (let k in Object.values(json.data)) {
      finalList.push(json.data[k]);
    }
    currentPage++;
  });
  while (currentPage <= pages) {
    let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;
    await axios.get(region_buy_id).then((json) => {
      for (let k in Object.keys(json.data)) {
        finalList.push(json.data[k]);
      }
    });
    currentPage++;
  }
  // console.log(finalList.length)
  return finalList;
}

export async function getAllMarketOrders(region) {
  let finalList = [];
  let pages = 0;
  let currentPage = 1;

  let region_buy_id = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=all&page=${currentPage}`;

  await axios.get(region_buy_id).then((json) => {
    pages = json.headers["x-pages"];
    for (let k in Object.values(json.data)) {
      finalList.push(json.data[k]);
    }
    currentPage++;
  });
  while (currentPage <= pages) {
    let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;
    await axios
            .get(region_buy_id)
            .then((json) => {
                for (let k in Object.keys(json.data)) {
                    finalList.push(json.data[k]);
            }
    });
    currentPage++;
  }
  // console.log(finalList.length)
  return finalList;
}
