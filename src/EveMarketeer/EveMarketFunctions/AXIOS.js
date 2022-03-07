const axios = require("axios").default;

export async function getAllItemID(region) {
  let finalList = [];
  let pages = 0;
  let currentPage = 1;

  let region_buy_id = `https://esi.evetech.net/latest/markets/${region}/types/?datasource=tranquility&page=${currentPage}`;
  console.log("here")
  await axios
  .get(region_buy_id)
  .then((json) => {
    pages = json.headers["x-pages"];
    console.log(pages);
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

export async function getAllMarketOrders(region, type) {
  let finalList = [];
  let pages = 0;
  let currentPage = 1;

  let region_buy_id = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
  // console.log("starting")
  await axios
  .get(region_buy_id)
  .then((json) => {
    pages = json.headers["x-pages"];
    console.log("Pages", pages)
    for (let k in Object.values(json.data)) {
      finalList.push(json.data[k]);
    }
    currentPage++;
  });
  while (currentPage <= pages) {
    let region_buy_id = `https://esi.evetech.net/v1/markets/${region}/orders/?datasource=tranquility&order_type=${type}&page=${currentPage}`;
    await axios
            .get(region_buy_id)
            .then((json) => {
              // console.log("Current Pages ", currentPage, "of Type ",type)
                for (let k in Object.keys(json.data)) {
                    finalList.push(json.data[k]);
            }
    });
    currentPage++;
  }
  console.log(finalList.length)
  return finalList;
}
