

$(document).ready( function() {
       $.getJSON("json_data.json", function(data){
             $.each(data.post, function(){
                    $("ul").append("<li>Namn: " +this['name'] + 
                    "</li> <li>Inlägg: " + this['inlagg'] + "</li><li>" + "När: " + this['tid'] + "</li><br/>"
                    );}
                    );}
                    );}
                    );


       function handleSubmit(event) {
            event.preventDefault();
                 
             const data = new FormData(event.target);
             
                const value = Object.fromEntries(data.entries());
                 
                  /* value.topics = data.getAll("topics"); */  
                 
                     console.log({ value });
                   }
                 
                   const form = document.querySelector("form");
                   form.addEventListener("submit", handleSubmit);