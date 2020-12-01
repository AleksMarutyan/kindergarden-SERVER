const {Router, response} = require('express')
const Teacher = require('../models/Teacher')
const multer =  require('multer')
const router = Router()
const fs = require('fs')


router.post('/teacherregister',  async(req, res)=>{
    try{
        console.log(2)
        const {teachName, teachPhone, teachGroup , teachPost, teachOld, teachWorktime,teachEducation} = req.body;
        const teacherImage = req.files.teacherImage;

        ts = Math.floor(Date.now()/1000)+teacherImage.name;
        teacherImage.mv(`${__dirname}/../kinder-admin/src/uploads/${ts}`,err=>{
            if(err){
                console.log(err)
                res.status(500).send();
            }

        })
        const teachImage = ts;
        const teacher = new Teacher({teachName, teachPhone, teachGroup , teachPost, teachOld, teachWorktime,teachEducation, teachImage})
        
        await  teacher.save()
      
        res.status(201).json({message: "Учитель добавлен "})
        
    }catch(e){
        res.status(500).json({ message: e})
    }
})



router.get('/teacherregister',(req, res)=>{
    try{
     Teacher.find().then(response => {  
            res.status(201).json(response)
        });
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong'})
    }    
})

router.delete('/teacherregister/:id/:teachImage',async (req,res)=>{
    try{
        const id = req.params.id;
        const imgName = req.params.teachImage;
        console.log(imgName)
        await Teacher.findByIdAndRemove(id);
        try {
            fs.unlinkSync(`${__dirname}/../kinder-admin/src/uploads/${imgName}`)
            } catch(err) {
              console.error(err)
            }   
        res.status(201).json(response)
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong'})
    }    
}
)

module.exports = router