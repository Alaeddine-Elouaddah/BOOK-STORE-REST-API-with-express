const express = require("express"); 
const router = express.Router() ;
const Joi = require('joi') ;
router.use(express.json()) ;
const books = [{
    id: 1,
    title: "Black cover",
    author: "Alaeddine",
    description: "",
    price: 9.99,
    cover: "image.jpg"
}, {
    id: 2,
    title: "Black cover",
    author: "Alaeddine",
    description: "",
    price: 9.99,
    cover: "image.jpg"
}]; 
/**
 * @desc GET ALL BOOKS 
 * @route /api/books
 * @method GET
 * @access public 
 */
router.get('/',(req,res)=>{
    res.json(books)  ;
})
/**
 * @desc GET Book By Id 
 * @route /api/books 
 * @method GET
 * @access public 
 */
router.get('/:id',(req,res)=>{
    const book = books.find(b=>b.id===parseInt(req.params.id)) ; 
    if(book){
        res.status(200).json(book) ; 
    }
    else{
        res.status(404).send({message:"The book with this id not Found"}) ; 
    }
}) ; 
/**
 * @desc CREATE NEW  BOOK
 * @route  /api/books 
 * @method POST 
 * @accees public 
 */
router.post('/',(req,res)=>{
    const schema = Joi.object({
      title: Joi.string().min(3).max(20).required().trim() , 
      author: Joi.string().min(3).max(20).required().trim() , 
       description:Joi.string().min(3).max(200).required().trim() , 
      price: Joi.number().min(0).required() , 
      cover:Joi.string().min(3).max(20).required().trim() , 
    }) ; 
    const {error} = schema.validate(req.body) ;
    if(error){
        return res.status(400).json({message: error.details[0].message}); 
    } 
   const book = {
    id: books.length+1 , 
    title:req.body.title , 
    author:req.body.author,
    description:req.body.description,
    price:req.body.price,
    cover:req.body.cover
   }
   books.push(book) ; 
   res.status(201).send({message:"CREATED Succeful!"}); 
}) ;

/**
 * @desc UPDATE BOOK 
 * @route /api/books/ 
 * @method PUT
 * @acces public 
 */
 router.put('/:id',(req,res)=>{
     const schema = Joi.object({
      title : Joi.string().min(3).max(20).trim() , 
      author : Joi.string().max(3).max(20).trim() , 
      description : Joi.string().min(3).max(100).trim() , 
      price: Joi.number().min(0).required(), 
      cover:Joi.string().min(3).max(20).trim()
     }) ; 
     const {error} = schema.validate(req.body) ; 
     if(error) {
        res.status(400).json({message: error.details[0].message})
     }
     const book = books.find(b=>b.id===parseInt(req.params.id)) ; 
     if(book){
       res.status(200).json({message:"Book has been UPDATED  "}) ; 
     }else{
       res.status(404).json({message:"Book Not Found "}) ; 
     }
 }) ; 
router.delete('/:id',(req,res)=>{
    const book = books.find(b=>b.id===parseInt(req.params.id)) ; 
    if(book){
      res.status(200).json({message:"Book has been DELETED  "}) ; 
    }else{
      res.status(404).json({message:"Book Not Found "}) ; 
    }
}) ; 



module.exports = router;
