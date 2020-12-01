const { Schema, model} = require('mongoose')

const schema = new Schema({
    ocassionTime: { type: String, required: true},
    ocassionText: {type: String, required:true}, 
    imgName: {type: String, required:true},
    listKey:{type:Number}
})

module.exports = model( 'Ocassion', schema ) 