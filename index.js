
const express = require("express");
const app = express();

// app.get("/",function(req,res) {  < hade så innan,  vad är skillnaden på denna och den nedan?
app.get("/",(req,res) => {  

    res.sendFile(__dirname + "/index.html");   // visar html-sidan index.html

});

app.listen(3000);  // startar servern på port 3000

console.log("Kör servern på localhost:3000"); // meddelar att  servern körs

app.use(express.static("publik"));

// gammal kod nedan kanske använder
/*
app.post("/write", (req, res) => {
    let inlagg = req.body.inlagg;
    fs.readFile("json_data2.json", function (err, data) {
        let json = JSON.parse(data);
       // console.log("json: " + json[0].name);
       // console.log("json.topic: " + json.topic);
       
       json.push({"topic": "skitämne", "name": "Tore Vretman", "email": "nomail@nono.com", "message": "jag skulle vilja jobba hos er!"});
       
        fs.writeFile("json_data2.json", JSON.stringify(json), function(err){
          if (err) throw err;
          console.log("Ändringar sparade till filen!"); 
        });
      });
}) */