// Börjar med det vanliga för att initiera grejer och starta upp servern
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("publik"));
app.listen(4000);  // startar servern på port 4000
console.log("Kör servern på localhost:4000"); // meddelar att  servern körs

// initierar datum och tid för post
var date_ob = new Date();
// console.log(date_ob);
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();   
var date = year + "-" + month + "-" + day;
//console.log(date);  
var hours = date_ob.getHours();
if (date_ob.getMinutes() < 10 ) { var minutes ="0" + date_ob.getMinutes(); } // lite specialare för att få inledande nolla på minuter med en siffra
else {var minutes = date_ob.getMinutes ();}
var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
//console.log(dateTime);

app.get("/",(req,res) => {  // serverar en initial html-sida till besökaren
  res.sendFile(__dirname + "/exempel.html");
});


const fs = require("fs");

// Första routen för att hämta data från json-filen
app.get("/hamta-data", (req, res) => { 
  console.log("mottog förfrågan från klienten");
 // res.send("Hej från servern");
  fs.readFile("test.json", function(err, data) {
    if (err) throw err;
    
    res.send(data);
  });
});

// route för att ladda skriv-fran-mall-sidan utan att skriva
app.get("/skriv-fran-mall", (req, res) => { 
  fs.readFile("exempel.html", function(err, data){
      fs.readFile("test.json", function(err, minJson) {
          res.send(data.toString());
      });
  });
});


app.use(express.urlencoded({extended:true}));  // för att kunna använda urler

//route för att skriva till json-filen och presentera sidan, läser in exempel.html i data, läser in test.json i minJson, 
// skriver och pushar in en ny post (nyPost) i json och skriver tillbaka till filen.  Skickar sen html-filen på nytt till klienten
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
     
             res.send(data.toString());
    });
  });
});
