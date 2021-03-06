var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JsonSchema = new Schema({
    name: String,
    type: {type: Schema.Types.Mixed, default:'Point'},
    color: {type: String, default: '#0000ff'},
    desc: String,
    style: {
        radius: {type: Number, default: 8},
        fillColor: {type: String, default: '#00ce00'},
        color: {type: String, default: '#008c00'},
        weight: {type: Number, default: 2},
        opacity: {type: Number, default: 1},
        fillOpacity: {type: Number, default: 1}
    },
    coordinates: { type: [Number], index: '2dsphere'}
},{ collection: 'layercollection'});

// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema,'layercollection');

module.exports = mongoose.model('Json', JsonSchema,'layercollection');
