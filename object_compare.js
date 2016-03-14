"use strict"

var obj1 = {
    prop_string:"prop_string_value",
    prop_num:-1,
    prop_array:[0,1,2]
};

var obj2 = {
    prop_string:"prop_string_value",
    prop_num:-1,
    prop_array:[0,1,2]
};

var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};


//console.log(Object.keys(obj));

function areEqual(obj1, obj2){
    
    //check references
    if (obj1 === obj2) return true;
    
    var properties = Object.keys(obj1);
    
    for (var i in properties){
        var prop = properties[i];
        
        //check for property
        if (!obj2.hasOwnProperty(prop)){
            return false;
        }
        
        //property type
        if (typeof obj1[prop] != typeof obj2[prop]){
            return false;
        }
        
        //compare as arrays
        var arrCheckRes = checkForArray(obj1[prop], obj2[prop]);
        
        if (!arrCheckRes.same){
            return false;
        }
        
        if (arrCheckRes.same && arrCheckRes.equal){
            continue;
        }
        
        //compare dates
        if (Object.prototype.toString.call(obj1[prop]) === "[object Date]"){
            var res = compareDates(obj1[prop], obj2[prop]);
            if (res){
                continue;
            }
            else{
                return false;
            }
        }
        
        //compare objects
        if (typeof obj1[prop] === "object"){
            var res = areEqual(obj1[prop], obj2[prop]);
            if (res){
                continue;
            }
            else{
                return false;
            }
        }
        
        //simple types
        if (!(obj2[prop] === obj1[prop])){
            return false;
        }
    };
    
    return true;
}

function checkForArray(obj1, obj2){
    var isArr1 = Array.isArray(obj1);
    var isArr2 = Array.isArray(obj2);
    
    if (isArr1 && !isArr2){
        return {
            same:false,
            equal:false
        };
    }
    
    if (isArr2 && !isArr1){
        return {
            same:false,
            equal:false
        };
    }
    
    if (isArr1 && isArr2){
        return {
            same: true,
            equal: compareArrays(obj1, obj2)
        };
    }
    
    return {
        same: true,
        equal:false
    };
}

function compareArrays(arr1, arr2){
    if (arr1.length != arr2.length){
        return false;
    }
    
    for (var i in arr1){
        if (typeof arr1[i] != typeof arr2[i]){
            return false;
        }
        
        var arrCheckRes = checkForArray(arr1[i], arr2[i]);
        
        if (!arrCheckRes.same){
            return false;
        }
        
        if (arrCheckRes.same && arrCheckRes.equal){
            continue;
        }
        
        if (typeof arr1[i] === "object"){
            return areEqual(arr1, arr2);
        }
        
        if (arr1[i] === arr2[i]){
            continue;
        }
    }
    
    return true;
}

//go from the most likely to be different to the less
var dateMethods = ["getMilliseconds", "getSeconds", "getMinutes", "getHours", "getDate", "getMonth", "getFullYear"];
function compareDates(d1, d2){
    for (var i in dateMethods){
        var name = dateMethods[i];
        
        if (d1[name]()!=d2[name]()){
            console.log("dne");
            return false;
        }
        
    }
    
    return true;
}


console.log(areEqual(obj1, obj2));
console.log(areEqual(objA, objB));
console.log(areEqual(obj1, objB));