const {Router, response} = require('express')
const Ocassion = require('../models/Ocassion')
const router = Router()
const fs = require('fs')


router.post('/ocassionregister',  async(req, res)=>{
    try{  
       
        const {ocassionText,ocassionTime,listKey} =  req.body;
        console.log(listKey);
        const ocassionImage = req.files.ocassionImage;
        const imgName = ocassionImage.name;
        ocassionImage.mv(`${__dirname}/../kinder-admin/src/uploads/ocassion/${imgName}`,err=>{
            if(err){
                res.status(500).send("no upload");
            }
        })
        console.log(listKey);
        Ocassion.find({listKey}, function(err, data){
            console.log(data)
            if (!data.length){

                const ocassion = new Ocassion({ocassionTime,ocassionText,imgName,listKey})
                ocassion.save(function(err, doc) {
                    if (err) return console.error(err);
                    res.status(201).json({message: "Событие добавлено"})
                });
            } else {
                Ocassion.findByIdAndUpdate(data[0]._id,{imgName: imgName,ocassionText: ocassionText,ocassionTime: ocassionTime}, function(){
                    try {
                        fs.unlinkSync(`${__dirname}/../kinder-admin/src/uploads/ocassion/${data[0].imgName}`)
                        //file removed
                        } catch(err) {
                          console.error(err)
                        }   
                    res.status(201).json({message: "Событие обновлено"})
                })
            }  
        })
    }catch(e){
        res.status(500).json({ message: "didn't work"})
    }
})



router.get('/ocassionregister',(req, res)=>{
    try{
     Ocassion.find().then(response => {  
            res.status(201).json(response)
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong'})
    }    
})

// router.delete('/ocassion/:id/:teachImage',async (req,res)=>{
//     try{
//         const id = req.params.id;
//         const imgName = req.params.teachImage;
//         await Teacher.findByIdAndRemove(id);
//         // const path = `${__dirname}/../kinder-admin/src/uploads/${imgName}`
//         // try{ fs.unlinkSync(path)}catch(err){console.log(err)}
//         res.status(201).json(response)
//     }catch(e){
//         console.log(e);
//         res.status(500).json({ message: 'Something went wrong'})
//     }    
// }
// )

module.exports = router