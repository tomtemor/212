
const express = require("express");
const app = express();
const path = require("path");
const static_path = path.join(__dirname, "/publik");
app.use(express.static(static_path)); // för att servern ska hitta

// app.get("/",function(req,res) {  < hade så innan,  vad är skillnaden på denna och den nedan?
app.get("/",(req,res) => {  

    res.sendFile(static_path + "/exempel.html");   // visar html-sidan

});



app.listen(3000);  // startar servern på port 3000

console.log("Kör servern på localhost:3000"); // meddelar att  servern körs



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