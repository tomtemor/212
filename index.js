
const express = require("express");
const app = express();
const path = require("path");
// const static_path = path.join(__dirname, "/publik");
// app.use(express.static(static_path)); // för att servern ska hitta
app.use(express.static("publik"));
app.listen(4000);  // startar servern på port 4000
console.log("Kör servern på localhost:4000"); // meddelar att  servern körs

// app.get("/",function(req,res) {  < hade så innan,  vad är skillnaden på denna och den nedan?
app.get("/",(req,res) => {  
  // res.sendFile(static_path + "/exempel.html");   // visar html-sidan
  res.sendFile(__dirname + "/exempel.html");
});


const fs = require("fs");
// const { threadId } = require("worker_threads");

app.get("/hamta-data", (req, res) => {
  console.log("mottog förfrågan från klienten");
 // res.send("Hej från servern");
  fs.readFile("test.json", function(err, data) {
    if (err) throw err;
    
    res.send(data);
  });
});

app.get("/skriv-fran-mall", (req, res) => {
  fs.readFile("exempel.html", function(err, data){
      fs.readFile("test.json", function(err, minJson) {
        console.log("Minj" + minJson);
          let html = data.toString().replace(/ERSÄTT_MED_SERVERGENERERAT_INNEHÅLL/, minJson);
          res.send(html);
      });
  });
});

// ny skriv till fil -kod 2021-12-06
app.use(express.urlencoded({extended:true}));

app.post("/skriv-fran-mall", (req, res) => {
  fs.readFile("exempel.html", function(err, data){
  fs.readFile("test.json", function (err, minJson) {
      let json = JSON.parse(minJson);
      let nyPost = {
        topic: "tåpiiic",
        name: req.body.name,
        email: "nissehult718@sunet.se",
        message: req.body.inlagg 
      };

     // console.log("json: " + json[0].name);
     // console.log("json.topic: " + json.topic);
     
     //console.log(nyPost);
     json.push(nyPost);
     
      fs.writeFile("test.json", JSON.stringify(json), function(err){
        if (err) throw err;
        console.log("Ändringar sparade till filen!"); 
      });
      let output = "";
            for (post in json) {
                for (attribut in post) {
                    output += post[attribut] + " ";
                }
                output += "<br><br>";
            }
           // console.log("output: " + output); 
            let html = data.toString().replace(/ERSÄTT_MED_SERVERGENERERAT_INNEHÅLL/, output);
           // console.log("outp: " + output);
            res.send(html);
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