/*
Individuell inlämning del 2. Del 1, Gästbok
Christer Klasson SYNED21JON

Har skapat en enkel gästbok och lyckats få det funka!
*/




window.onload = function(){ 


// Ajax för att hämta data
let forfragan = new XMLHttpRequest();
forfragan.open("GET", "/hamta-data");

forfragan.onload = function(){
    console.log("mottaget svar från servern");
   // console.log(this);
   // console.log(this.response);
    data = JSON.parse(this.response);
   console.log(data);
 
   //for (let i = 0; i < data.length; i++) { // för vart och ett av objekten i fältet // tidigare kod
   for (let i = data.length-1; i >=0; i--) { // för vart och ett av objekten i fältet // ny kod > baklänges
    document.getElementById("output").innerHTML += data[i].date + " skrev ";
    document.getElementById("output").innerHTML += "<span style='color:red;'>" + data[i].name + " : </span>";
    document.getElementById("output").innerHTML += "<span style='white-space: pre-wrap;'>" + data[i].message + " </span>";

    document.getElementById("output").innerHTML += "<br><br>";
}

}

forfragan.send(); 

    



console.log("last line");
}