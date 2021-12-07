
const express = require("express");
const app = express();
const path = require("path");
// const static_path = path.join(__dirname, "/publik");
// app.use(express.static(static_path)); // för att servern ska hitta
app.use(express.static("publik"));
app.listen(4000);  // startar servern på port 4000
console.log("Kör servern på localhost:4000"); // meddelar att  servern körs

// initierar datum och tid för post
var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();   
var date = year + "-" + month + "-" + day;
//console.log(date);  
var hours = date_ob.getHours();
var minutes = date_ob.getMinutes();
// var seconds = date_ob.getSeconds();
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
//console.log(dateTime);

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
        date: dateTime,
        name: req.body.name,
        message: req.body.inlagg 
      };
 
     //console.log(nyPost);
     json.push(nyPost);
     
      fs.writeFile("test.json", JSON.stringify(json), function(err){
        if (err) throw err;
        console.log("Ändringar sparade till filen!"); 
      });
      //
     /* let output = "";
            for (post in json) {
                for (attribut in post) {
                    output += post[attribut] + " ";
                }
                output += "<br><br>";
            } */
           // console.log("output: " + output); 
           // let html = data.toString().replace(/ERSÄTT_MED_SERVERGENERERAT_INNEHÅLL/, output);
          //let html = data.toString();
           // console.log("outp: " + output);
             //res.send(html);
             res.send(data.toString());
             //res.send(JSON.parse(data));
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