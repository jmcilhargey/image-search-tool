"use strict";

(function () {
    
    document.querySelector(".btn").addEventListener("click", function(event) {
       event.preventDefault();
       
       var http = new XMLHttpRequest();
       var query = document.querySelector("input[name='search']").value;
       var url = window.location.href + "api/" + query;
       
       http.open("GET", url, true);
       http.send();
       
       http.onload = function() {
            var data = JSON.parse(http.responseText);
                data.forEach(function(object){
                    var image = document.createElement("img");
                    image.setAttribute("class", "col-md-4 thumbnail")
                    image.setAttribute("src", object.url);
                    var panel = document.getElementById("results");
                    panel.appendChild(image);
                })
                
        };
       http.onerror = function() {
         document.getElementById("results").innerHTML = "An error occurred";  
       };
    });

})();

