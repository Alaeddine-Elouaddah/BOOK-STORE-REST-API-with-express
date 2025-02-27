const http = require("http") ; 
const books  = [
    {
        id : 1 , 
        name : "Alae" 
    } , {
        id : 2 , 
        name : "Akram " 
    }
]

const server = http.createServer((req , res) => {
   if(req.url === '/'){
     res.write("<h1> Inchaalah Expern In Mern Stack   </h1> " ) ;   
     res.end() ;      
    } 
    else if(req.url === '/api/books'){
       res.write(JSON.stringify(books)) ; 
       res.end() ; 
    }
    else{
         res.write("<h1>Page note Found   </h1>") ; 
    }
    

}) ; 
const PORT = 5000; 
server.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`) ) ; 