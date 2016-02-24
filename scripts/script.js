"use strict";

(function () {
    
    document.querySelector(".btn").addEventListener("click", function(event) {
       event.preventDefault();
       
       var http = new XMLHttpRequest();
       var query = document.querySelector("input[name='search']").value;
       var url = window.location.href + "api/" + query;
       
       http.open("GET", url, true);
       
       http.onload = function() {
         document.getElementById("results").innerHTML = http.responseText;  
       };
       http.onerror = function() {
         document.getElementById("results").innerHTML = "An error occurred";  
       };
    });

})();

