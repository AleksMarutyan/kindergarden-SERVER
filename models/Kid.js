const { Schema, model} = require('mongoose')

const schema = new Schema({
    kidName: { type: String, required: true},
    parentName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    old: {type: String, required: true},
    email: {type: String},
    status: {type: String, required: true, default: "applicant"}    
})

module.exports = model( 'Kid', schema ) 