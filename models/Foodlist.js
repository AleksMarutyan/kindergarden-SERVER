const { Schema, model} = require('mongoose')

const food = {
    first11:  {type: String},
    second11: {type: String},
    third11:  {type: String},
    first12:  {type: String},
    second12: {type: String},
    third12:  {type: String},
    first13:  {type: String},
    second13: {type: String},
    third13:  {type: String}
}

const schema = new Schema({
  listKey: Number,  
  monday:food,
  tuesday:food,
  wednesday:food,
  thursday:food,
  friday:food,
})

module.exports = model( 'Foodlist', schema ) 