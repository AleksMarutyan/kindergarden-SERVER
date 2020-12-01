const  express = require('express')
const fileUpload = require('express-fileupload')
const  config  = require('config')
const  mongoose = require('mongoose')
const  bodyParser = require('body-parser')
const  cors = require('cors')
mongoose.set('useFindAndModify', false);

const kinderAdmin = express()
kinderAdmin.use(cors())
kinderAdmin.use(fileUpload())
kinderAdmin.use(bodyParser.urlencoded({ extended: true}))
kinderAdmin.use(bodyParser.json())
 

kinderAdmin.use('/' , require('./routes/routers'))

const PORT = config.get('port')

async function start(){
    try{
         await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log(mongoose.connection.readyState);
        kinderAdmin.listen(PORT, ()=> console.log   (`kinderAdmin `))
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}


start()