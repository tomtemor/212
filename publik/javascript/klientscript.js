// alert("Hej hej!");

window.onload = function(){ 
// $(document).ready( function() {
    /* TIDIG KOD FÖR ATT PRESENTERA INLÄGG,  ><< ! fungerar förmodligen inte för att data inte kan hämtas från icke publik mapp?
    console.log("test");
    $.getJSON("test.json", function(data){
          $.each(data.post, function(){
                 $("ul").append("<li>Namn: " +this['name'] + 
                 "</li> <li>Inlägg: " + this['inlagg'] + "</li><li>" + "När: " + this['tid'] + "</li><br/>"
                 );}
                 );}
                 ); 
                 */


let forfragan = new XMLHttpRequest();
forfragan.open("GET", "/hamta-data");

forfragan.onload = function(){
    console.log("mottaget svar från servern");
   // console.log(this);
   // console.log(this.response);
    data = JSON.parse(this.response);
  // console.log(data);
 
   //for (let i = 0; i < data.length; i++) { // för vart och ett av objekten i fältet // tidigare kod
   for (let i = data.length-1; i >=0; i--) { // för vart och ett av objekten i fältet // ny kod > baklänges
   
   for (attribut in data[i]) {
        document.getElementById("output").innerHTML += data[i][attribut] + " ";
    }
    document.getElementById("output").innerHTML += "<br><br>";
}

}

forfragan.send(); 

console.log("last line");
}