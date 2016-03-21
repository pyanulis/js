readCookies();

var create = document.getElementById("createCookie");
create.onclick = function(){
    var cName = document.getElementById("cookieName");
    console.log(cName);
    setCookie(cName.value, new Date().getTime(), {expires:3600});
    readCookies();
}

function readCookies(){
    var cs = document.cookie.split(";");
    var table = document.getElementById("table");
    table.innerHTML = "";
    
    console.log(cs);
    if (cs.length < 1 || cs[0].split("=").length<2) return;
    
    for (var i in cs){
        var name = cs[i].split("=")[0];
        var value = cs[i].split("=")[1];
        var layout = "<div class=\"container\">"+
                "<div class=\"name\">" + name + "</div>"+
                "<div class=\"value\">" + value + "</div>"+
                "<div><input type=\"button\" class=\"delete\" id=\"d" + i + "\" value=\"delete\"></div></div>";
        table.innerHTML += layout;
    }

    var inputs = document.getElementsByClassName("delete");
    for (var i in inputs){
        inputs[i].onclick = function(e){
            var index = e.target.id.substring(1);
            var name = cs[index].split("=")[0];
            
            deleteCookie(name);
            readCookies();
        }
    }
}


function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    console.log(updatedCookie);
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    });
}