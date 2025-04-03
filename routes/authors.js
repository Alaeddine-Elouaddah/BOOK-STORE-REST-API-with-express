  const express = require("express"); 
 const router = express.Router();
 router.use(express.json()) ; 
 const Joi =  require('joi') ; 
const { route } = require("./books");
 const  authors = [{
    id : 1  ,  
firstName  : "Alaeddine" ,  
lastName : "Elouaddah " , 
nationality :"Morroco" ,   
image : "image.pnj"     
 } , 
 { 
    id : 2  ,  
    firstName  : "Ichrak " ,  
     lastName : "Salmouni" , 
      nationality :"Morroco" ,   
       image : "image.pnj"       
 }]  ; 
 /**
  * @desc GET ALL AUTHORS 
  * @router api/authors 
  * @method GET  
  * @acces public 
  */
 
 router.get('/',(req,res)=> {
     res.status(200).json(authors) ; 
 }) ; 
 /**
  * @desc GET AUTHORS BY ID  
  * @router api/authors  
  * @method GET  
  * @access public 
  */
 router.get('/:id',(req,res)=>{
    const author = authors.find(b=>b.id===parseFloat(req.params.id)) ; 
    if(author){
         res.status(200).json(author) ; 
    }
    else{
        res.status(404).json({message:"This author not found "}) ; 
    }
 }) 
  /**
  * @desc  CREATE NEW BOOK   
  * @router api/authors  
  * @method POST    
  * @access public 
  */ 
 router.post('/',(req,res)=>{
        const schema = Joi.object({
            firstName: Joi.string().trim().min(3).max(10).required() , 
            lastName : Joi.string().trim().min(3).max(10).required() ,
             nationality : Joi.string().trim().min(3).max(10).required() ,
             image:Joi.string().trim().min(3).max(10).required() ,
        }) ;
        const {error} = schema.validate(req.body);
        if(error) {
          res.status(400).json({ message :error.details[0].message})     
        } 
        else{
             const author = {
            id: authors.length+1 , 
            firstName: req.body.firstName ,
            lastName:req.body.lastName , 
            nationality : req.body.nationality , 
            image : req.body.nationality 
        }
        authors.push(author) ; 
        res.status(201).json({message:"Author CREATED SUCCEFUL"}) ; 
       
        }
       
 }) 

//

/**
 * @desc UPDATE Authors  
 * @route /api/authors/ 
 * @method PUT
 * @acces public 
 */
 router.put('/:id',(req,res)=>{
     const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(10).required() , 
        lastName : Joi.string().trim().min(3).max(10).required() ,
         nationality : Joi.string().trim().min(3).max(10).required() ,
         image:Joi.string().trim().min(3).max(10).required() ,
     }) ; 
     const {error} = schema.validate(req.body) ; 
     if(error) {
        res.status(400).json({message: error.details[0].message})
     }
     const author = authors.find(b=>b.id===parseInt(req.params.id)) ; 
     if(author){
       res.status(200).json({message:"Author has been UPDATED  "}) ; 
     }else{
       res.status(404).json({message:"Author Not Found "}) ; 
     }
 }) ; 
router.delete('/:id',(req,res)=>{
    const author = authors.find(b=>b.id===parseInt(req.params.id)) ; 
    if(author){
      res.status(200).json({message:"Author has been DELETED  "}) ; 
    }else{
      res.status(404).json({message:"Author Not Found "}) ; 
    }
}) ; 



 module.exports = router ; 