// The main module returns a default Api instance with an attached
// Api constructor if configuration changes are necessary.
let esi = require("eve-swagger");
const axios = require('axios').default;

// Creating a new Api instance with a different configuration.
// All options, with their default values, are shown below.


function eveInfo() {

    var strr = [];
    axios.get(` https://esi.evetech.net/latest/markets/groups/?datasource=tranquility`)
        .then(function(response){

            strr.push(response.data);
            return strr;
        })


        .catch(function(error){
            console.log(error);
        });



}

let x = eveInfo();
console.log(x);
