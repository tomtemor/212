alert("Hej hej!");

window.onload = function(){
// $(document).ready( function() {
    console.log("test");
    $.getJSON("json_data.json", function(data){
          $.each(data.post, function(){
                 $("ul").append("<li>Namn: " +this['name'] + 
                 "</li> <li>Inlägg: " + this['inlagg'] + "</li><li>" + "När: " + this['tid'] + "</li><br/>"
                 );}
                 );}
                 );
                 


let forfragan = new XMLHttpRequest();
forfragan.open("GET", "/hamta-data");

forfragan.onload = function(){
    console.log("mottaget svar från servern");
    console.log(this);
    console.log(this.response);

}

forfragan.send(); 

console.log("last line");
}