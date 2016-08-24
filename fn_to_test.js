function createRandomString(length){var str="";for( ;str.length<length;str+=Math.random().toString(36).substr(2));return str.substr(0,length);}


function vosAjax(u,c){
    //console.log('vosAjax>',u,c);
    
    var xhrT;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xhrT=new XMLHttpRequest();
    }

    else{ // code for IE6, IE5
      xhrT=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhrT.open("GET",u,true);
    xhrT.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrT.send();
    xhrT.onreadystatechange = function() { // (3)
        if (xhrT.readyState == 4){
            if (xhrT.status != 200) {
                console.log('BAD STATUS: ',xhrT.status + ': ' + xhrT.statusText);
            } else {
                return c(xhrT.responseText,xhrT);
                xhrT.abort();
            }
        }
    };
}
