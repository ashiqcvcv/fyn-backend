const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/fyn');
mongoose.set('strictQuery', true);

module.exports = mongoose.model('priceMaster', new Schema({
    name: String,
    enabled: { type: Boolean, default: true },
    DBPdistance: { type: Number, required: true },
    DBPprice: { type: Number, required: true },
    DAP: { type: Number, required: true }, //calculated per km
    TMF: [{
        factor: { type: Number },
        maxlimit: { type: Number }
    }]
}));