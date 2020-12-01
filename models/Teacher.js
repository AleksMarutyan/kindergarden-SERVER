const { Schema, model} = require('mongoose')

const schema = new Schema({
    teachName: { type: String, required: true},
    teachPhone: {type: String, required:true}, 
    teachGroup: {type: String, required:true} , 
    teachPost: {type: String, required:true}, 
    teachOld: {type: String, required:true}, 
    teachWorktime: {type: String, required:true},
    teachImage: {type: String, required:true},
    teachEducation: {type: String, required:true}    
})

module.exports = model( 'Teacher', schema ) 