const express = require('express');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;




const url = "mongodb://ines:ines8matilde4@ac-or9smg1-shard-00-00.yrwhyv9.mongodb.net:27017,ac-or9smg1-shard-00-01.yrwhyv9.mongodb.net:27017,ac-or9smg1-shard-00-02.yrwhyv9.mongodb.net:27017/?ssl=true&replicaSet=atlas-eue0di-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbName = "Projeto_TDW";
const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true
});


function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('Nao esta autenticado');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    if (user == 'ijr' && pass == '123456') {
 
        // Caso seja autorizado
        next();
    } else {
        var err = new Error('Nao esta autenticado ');
        res.setHeader('WWW-Authenticate', 'Basic');
    }
 
}
 

app.use(authentication)






connect.then(()=>{
    let pratos = require("./controllers/menu_do_dia");
    console.log("Esta conectado ao servidor");
   
    
    app.use("/pratos", pratos);
    app.listen(port, () =>  console.log());
    
    })

   