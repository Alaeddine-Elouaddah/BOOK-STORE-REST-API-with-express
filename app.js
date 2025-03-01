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
     res.write("<h1> Inchaalah Expert In Mern Stack   </h1> " ) ;   
     res.end() ;      
    } 
    else if(req.url === '/api/books'){
       res.write(JSON.stringify(books)) ; 
       res.end() ; 
    }
    else if (req.url === '/api/books/:id'){
        res.write("<h1>Id Not Found </h1>") ;
        res.end() ;  
    }
    else if (req.url==='/api/books/ :name'){
          res.write("<h2>Title Not Found </h2>") ;
          res.end() ; 
    }
    else{
         res.write("<h1>Page not Found   </h1>") ; 
         res.end() ; 
    }
}) ; 
 
const PORT = 5000; 
server.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`) ) ; 