const {Router, response} = require('express')
const Foodlist = require('../models/Foodlist')
const router = Router()

router.post('/foodlistregister',async(req, res)=>{
    try{  
        const {monday,tuesday,wednesday,thursday,friday,listKey} = req.body;
    
        console.log(listKey)
        const newObj = {};
        if (monday){
            newObj.monday = monday;
        }
        if (tuesday){
            newObj.tuesday = tuesday;
        }
        if (wednesday){
            newObj.wednesday = wednesday;
        }
        if (thursday){
            newObj.thursday = thursday;
        }
        if (friday){
            newObj.friday = friday;
        }
        Foodlist.find({listKey}, function(err, data){
            if (!data.length){
                const foodlist = new Foodlist({monday,tuesday,wednesday,thursday,friday,listKey})
                foodlist.save(function(err, doc) {
                    if (err) return console.error(err);
                    res.status(201).json({message: "Еда добавленa"})
                });
            } else {
                Foodlist.findByIdAndUpdate(data[0]._id, newObj, function(){
                    res.status(201).json({message: "asda"})
                })
            }  
        })
    }catch(e){
        res.status(500).json({ message: e})
    }
})

router.get('/foodlistregister', (req,res)=>{
   try {
        Foodlist.find().then(response => {
        res.status(201).json(response)
    });
   } catch (error) {
       res.status(500).json({ message: "get error"}) 
   }
})

module.exports = router