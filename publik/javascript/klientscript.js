/*
Individuell inlämning del 2. Del 1, Gästbok
Christer Klasson SYNED21JON

Har skapat en enkel gästbok och lyckats få det funka!
Försökte få till lite mer funktionalitet men det blev för krångligt... Har grundläggande koden..
*/

window.onload = function(){ 

//  Validering av textarean i formuläret 
      let button_button = document.getElementById("button");
      button_button.disabled = true; // inaktivera button_buttonen från början
      let mandatory = document.getElementsByClassName("mandato");
      console.log(mandatory);
     // for (let i = 0; i < mandatory.length; i++) { // loopa igenom alla (båda) formulärfälten
          mandatory[0].addEventListener("input", function() {  // lägg till händelselyssnare till varje formulärfält; händelsen "input" triggas när användaren skriver eller raderar något i input-fältet
              //console.log("Skriver i formuläret");
              //console.log(mandatory[i].value);
              button_button.disabled = false;    // aktivera button_buttonen
              this.style = "border : solid green;";   // ge återkoppling till användaren att formulärfältet är korrekt
           //   for (let j = 0; j < mandatory.length; j++) { // loopa igenom alla (båda) formulärfälten igen
                  if (!mandatory[0].value) {
                      button_button.disabled = true; // avaktivera button_buttonen
                      mandatory[j].style = "border : solid red;";  // ge återkoppling till användaren att formulärfältet är fel infyllt
                  }
            //  }
          });
     // }
    


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