var jsonObj = require("C:\\Users\\chril\\OneDrive\\Dokument\\GitHub\\212\\test.json");

// let json = JSON.parse(jsonObj);
jsonObj.push({"topic": "skitämne", "name": "Tore Vretman", "email": "nomail@nono.com", "message": "jag skulle vilja jobba hos er!"});
   
console.log("jsonObj: " + jsonObj[2].name);

fs.writeFile("test.json", JSON.stringify(json), function(err){
    if (err) throw err;
    console.log("Ändringar sparade till filen!"); 
  });