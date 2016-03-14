var dictNames = new Array();
var dictClasses = new Array();
var dictAttrs = new Array();
var textNodes = 0;

function incrementKey(dict, key){
    if (isNaN(dict[key])){
        dict[key] = 0;
    }
    dict[key] += 1;
}

function inspectDom(element){
    
    var name = element.tagName;
    
    if (element.nodeType === 3){
        ++textNodes;
        return;
    }
    
    if (element.nodeType === 2 || name == undefined){
        return;
    }
    
    incrementKey(dictNames, name);
    
    if (element.className === ""){
        incrementKey(dictClasses, "$empty_class");
    }
    else{
        incrementKey(dictClasses, element.className);
    }
    
    for (var i in element.childNodes){
        inspectDom(element.childNodes[i])
    }
}

function display(dict){
    Object.keys(dict).forEach(function(key){
        console.log(key + ":", dict[key]);
    });
}

inspectDom(document.documentElement);

console.log("Nodes");
console.log("Text nodes: ", textNodes);
display(dictNames);
console.log("");
console.log("Classes");
display(dictClasses);
console.log("");
console.log("Attributes");
display(dictAttrs);