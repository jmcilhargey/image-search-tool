"use strict";

var page = 1;

function preventSubmit() {
    if (event.keyCode === 13) {
		return false;
    }
}

function newSearch(id) {
    
    
    var http = new XMLHttpRequest();
    var query = document.querySelector("input[name='search']").value;
    
    if (id === "search") {
        var url = window.location.href + "api/" + query;
    }
    
    if (id === "nextpage") {
        page += 1;
        url = window.location.href + "api/" + query + "/" + page;
    }
    
    http.open("GET", url, true);
    http.send();
    
    http.onload = function() {
        document.getElementById("results").innerHTML = "";
        var data = JSON.parse(http.responseText);
            data.forEach(function(object) {
                var img = document.createElement("img");
                img.setAttribute("class", "thumbnail col-md-4");
                img.setAttribute("src", object.url);
                var panel = document.getElementById("results");
                panel.appendChild(img);
            });
    };

    http.onerror = function() {
        document.getElementById("results").innerHTML = "An error occurred";  
    };
}

function recentSearch() {
    
    var http = new XMLHttpRequest();
    var url = window.location.href + "recent";
    
    http.open("GET", url, true);
    http.send();
    
    http.onload = function() {
        var data = JSON.parse(http.responseText);
        
        var panel = document.getElementById("results");
        panel.setAttribute("class", "");
        panel.innerHTML = "";
        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group");
        panel.appendChild(ul);

        data.forEach(function(object) {
            var row = document.createElement("li");
            row.setAttribute("class", "list-group-item");
            ul.appendChild(row);
            row.innerHTML = object.search + " -- " + object.date;
        });
    };
}




