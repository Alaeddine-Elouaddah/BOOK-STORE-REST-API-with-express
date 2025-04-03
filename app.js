const express =  require("express") ; 
const app  = express() ; 
const PORT = 8000; 
const books = [{
        
}] ; 
app.get('/',(req,res)=>{
     res.send("HELOO EXPRESS ! ") ; 
}) ; 
app.get('/api/books' , (req,res)=> {
   res.send("WELCOME TO STORE API");
}  ); 


















app.listen(PORT , () => console.log(`Server is Running on Port ${PORT}`)) ; 
