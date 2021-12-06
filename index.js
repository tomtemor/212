
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

const fs = require("fs");
const { threadId } = require("worker_threads");

app.get("/hamta-data", (req, res) =>{
  console.log("mottog förfrågan från klienten");
  res.send("Hej från servern");
  fs.readFile("test.json", function(err, data) {
    if (err) throw err;
    res.send(data);
  }
});


// ny skriv till fil -kod 2021-12-06
app.use(express.urlencoded({extended:true}));
app.post("/skriv-fran-mall", (req,res) => {

  fs.readFile("test.json", function (err, data) {
      let json = JSON.parse(data);
      let nyPost = {
        topic: "skitämne",
        name: req.body.name,
        email: "nissehult@sunet.se",
        message: req.body.inlagg 
      };

     // console.log("json: " + json[0].name);
     // console.log("json.topic: " + json.topic);
     
     console.log(nyPost);
     json.push(nyPost);
     
      fs.writeFile("test.json", JSON.stringify(json), function(err){
        if (err) throw err;
        console.log("Ändringar sparade till filen!"); 
      });
    });

});

// gammal kod nedan * kanske använder
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