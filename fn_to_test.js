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

/* paste raw html with script tags to be working START */
// Evalulates a script in a global context
function globalEval( data ) {
	var rnotwhite = /\S/; // Check if a string has a non-whitespace character in it
	if ( data && rnotwhite.test(data) ) {
		var head = document.getElementsByTagName("head")[0] || document.documentElement,
		script = document.createElement("script");
		script.type = "text/javascript";
		/*
		id = "script" + (new Date).getTime();
03
	    script.type = "text/javascript";
04
	    try {
05
	        script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
06
	    } catch(e){}
07
	 
08
	    root.insertBefore( script, root.firstChild );
09
	     
10
	    // Make sure that the execution of code works by injecting a script
11
	    // tag with appendChild/createTextNode
12
	    // (IE doesn't support this, fails, and uses .text instead)
13
	    if ( window[ id ] ) {
14
	        jQuery.support.scriptEval = true;
15
	        delete window[ id ];
16
	    }
17
	 
18
	    root.removeChild( script );
		*/
		if ( jQuery.support.scriptEval ) {
			script.appendChild( document.createTextNode( data ) );
		} else {
			script.text = data;
		}
		// Use insertBefore instead of appendChild to circumvent an IE6 bug.
		head.insertBefore( script, head.firstChild );
		head.removeChild( script );
	}
}
function createHTML(html,context) {
	if(typeof(context)=="undefined"){context=document;}
	var container = context.createElement('div');
	var secondContainer=context.createElement('div');;
		secondContainer.innerHTML = html;
		container.appendChild(secondContainer);
	// return second container with all contents
	return container.firstChild;
}
function pasteRichmedia(richmedia,context){
	if(typeof(context)=="undefined"){context=document;}
	var domiseRichmedia=createHTML(richmedia,context);
	var scriptsToExecute=domiseRichmedia.getElementsByTagName('script');
	console.log('scriptsToExecute',scriptsToExecute);
	for(var i in scriptsToExecute){
		var s=scriptsToExecute[i];
		if ( s.src ) {
			//TODO if tag has src url - evaluate through request (cors)	
		}else{
			globalEval( s.text || s.textContent || s.innerHTML || "" )
		}
	}
	context.body.appendChild(domiseRichmedia);
  
}
pasteRichmedia('<script type="text/javascript">console.log(\'lolol\');</script><script type="text/javascript">console.log(\'lolol2\');</script>');
/* paste raw html with script tags to be working END */

/***/
function parseSomeListOnThePage(){
	var plItm =$('#sidebar .playlist ol li');
var arr=[];
plItm.each(function(){
  arr.push({
    artist:$(this).attr('singer'),
    track:$(this).attr('song'),
    bitrate:$(this).attr('rate'),
    size:$(this).attr('size')
  });
});
var txt=document.createElement('textarea');
txt.style.width="800px";
txt.style.height="400px";
txt.value=JSON.stringify(arr);
document.body.appendChild(txt);
console.log(plItm,arr);
	
}
