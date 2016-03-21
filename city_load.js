//request for the whole list
var request = new XMLHttpRequest();
request.open("GET", "https://raw.githubusercontent.com/lapanoid/loftblog/master/cities.json", true);
request.onload = response;
request.onerror = requestError;
request.responseType = "json";
setTimeout(function(){
    console.log("send");
    request.send();
}, 5000);

//response object
var fullCityList;

//filter input
var inputCity = document.getElementById("inputCity");
inputCity.focus();
inputCity.onkeyup = function(e){
    
    var cities;
    
    var p = new Promise(function(resolve, reject){
        
        if (!fullCityList) reject("No data");
        
        cities = parseCityList(inputCity.value, fullCityList);
        resolve();
    }).then(function(){
        generateUiList(cities);
    },
           function(err){
        generateError(err);
    });
}

function response(e){
    fullCityList = request.response;
    console.log("gotit");
    var ul = document.getElementById("cities");
    ul.innerHTML = "<li style=\"color:green;\"> data loaded </li>";
    setTimeout(function(){
        ul.innerHTML = "";
    }, 800);
}

function requestError(e){
    console.log("req_err", e);
}

//filter cities
function parseCityList(filter, source){
    if (filter === "") return [];
    
    var arrFiltered = [];
    for (var i in source){
        if (source[i].name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1){
            arrFiltered.push(source[i]);
        }
    }
    
    return arrFiltered;
}

//generate the UI
function generateUiList(cities){
    var list = "";
    for (var i in cities){
        list += "<li>" + cities[i].name + "</li>";
    }
    var ul = document.getElementById("cities");
    ul.innerHTML = list;
}

//generate the UI
function generateError(err){
    var ul = document.getElementById("cities");
    ul.innerHTML = "<li>" + err + "</li>";
}