const {Router, response} = require('express')
const Kid = require('../models/Kid')
const router = Router()

router.post('/kidregister',async(req, res)=>{
    try{
        const {kidName, parentName, phoneNumber, address, old, status, email} = req.body

        const kid = new Kid({kidName,parentName,phoneNumber,address,old, status, email})
        await  kid.save()
        res.status(201).json({message: "Ребенок добавлен"})
        
    }catch(e){
        res.status(500).json({ message: 'Something went wrong'})
    }
})
router.get('/kidregister',async (req, res)=>{
    try{
        Kid.find().then(response => {
                res.status(201).json(response)
            });
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong stexa '})
    }    
})

router.put('/kidregister/status',async (req,res)=>{
   const newstatus =  req.body.status;
   const id = req.body.id;
   try{
       await Kid.findById(id,(err,kid)=>{
             kid.status = newstatus;
             kid.save();
             res.status(201).json("updated")
       }) 
   }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Something went wrong stexa '})
   } 
})


router.delete('/kidregister/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        await Kid.findByIdAndRemove(id)
        res.status(201).json("deleted")    
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Something went wrong stexa '})
    }

}
)
module.exports = router