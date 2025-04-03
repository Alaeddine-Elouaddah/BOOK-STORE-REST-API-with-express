const express =  require("express") ; 
const app  = express() ; 
const PORT = 8000 ; 
const Joi = require('joi') ; 
app.listen(PORT , ()=>console.log(`Server is runnig on PORT ${PORT}`)) ; 
// Apply Middleware 
app.use(express.json()) ; 
const books = [{
    id:1 ,
    title: "Black cover",
   author: "Alaeddine",
   description: "",
   price: 9.99,
   cover: "image.jpg"
}, {
    id:2 ,
    title: "Black cover",
   author: "Alaeddine",
   description: "",
   price: 9.99,
   cover: "image.jpg"
}]  ; 
app.get('/api/books',(req,res)=>{
    res.json(books)  ;
})
app.get('/api/books/:id',(req,res)=>{
    const book = books.find(b=>b.id===parseInt(req.params.id)) ; 
    if(book){
        res.status(200).json(book) ; 
    }
    else{
        res.status(404).send({message:"The book with this id not Found"}) ; 
    }
}) ; 
app.post('/api/books',(req,res)=>{
    const schema = Joi.object({
      title: Joi.string().min(3).max(20).required().trim() , 
      author: Joi.string().min(3).max(20).required().trim() , 
       description:Joi.string().min(3).max(200).required().trim() , 
      price: Joi.number().min(0).required() , 
      cover:Joi.string().min(3).max(20).required().trim() , 
    }) ; 
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
