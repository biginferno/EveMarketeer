const mongoose = require('mongoose');
const { Item } = require('../../src/Components/EveMarketFunctions/ItemInfo');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_id: {type:Number, required:true},
    item_name: {type: String},
    item_graphic: [{type:String}, {type:Number}],
}, {
    timestamps:true,
});
const ItemInfo = mongoose.model('ItemInfo', itemSchema);

const stationSchema = new Schema({
    station_region:{type:Number, required:true},
    station_id:{type:Number, required:true},
    station_name:{type:String, required:true}

});

const StationInfo = mongoose.model('StationInfo', stationSchema);

module.exports = [ItemInfo, StationInfo]; 