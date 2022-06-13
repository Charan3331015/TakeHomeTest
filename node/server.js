const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(4200, ()=>{
    console.log("Sever is now listening at port 4200");
})

client.connect();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
const bodyParser = require("body-parser");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

// Registreation API creation starts
app.post('/registration', (req, res)=> {
    console.log("req123",req);
    const user = req.body;
    console.log("req",user);
    let insertQuery = `insert into userdata(firstname, lastname, email, password) 
    values('${user.firstname}', '${user.lastname}', '${user.email}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ 
            res.send(err.message);
            console.log(err.message) }
    })
    client.end;
})
// Registreation API creation end

//Login API creation Starts
app.post('/login', (req, res)=> {
    console.log("req123",req);
    const user = req.body;
    console.log("req",user);
    client.query(`Select * from userdata where email= '${user.email}' and password= '${user.password}'`, (err, result)=>{
        if(!err){
            res.send(result);
        }
        else{
            res.send(result)
        }
    });
    client.end;
})

//Login API creation End


