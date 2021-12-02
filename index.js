
const express = require("express");

const fs = require("fs");

const app = express();

app.get("/",function(req,res) {  

    res.sendFile(__dirname + "/index.html");   // visar html-sidan index.html

});

app.listen(3000);  // startar servern på port 3000

console.log("Kör servern på localhost:3000"); // meddelar att  servern körs

app.post("/skriva-fil", (req, res) => {
    let meddelande = req.body.meddelande;
    fs.readFile("kontakt-meddelande-7.json", function (err, data) {
        let json = JSON.parse(data);
       // console.log("json: " + json[0].name);
       // console.log("json.topic: " + json.topic);
       
       json.push({"topic": "skitämne", "name": "Tore Vretman", "email": "nomail@nono.com", "message": "jag skulle vilja jobba hos er!"});
       
        fs.writeFile("kontakt-meddelande-10.json", JSON.stringify(json), function(err){
          if (err) throw err;
          console.log("Ändringar sparade till filen!"); 
        });
      });
})