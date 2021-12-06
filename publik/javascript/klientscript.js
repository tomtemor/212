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
                 );}
                 ;
