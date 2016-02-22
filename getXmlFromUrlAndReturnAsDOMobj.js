function getXMLFromUrl(url){
	var res;
	if(window.XMLHttpRequest){
		res=new window.XMLHttpRequest();
		res.open("GET", url, false);
		res.send("");
		return res.responseXML;
	}else if(window.ActiveXObject){
		res=new ActiveXObject("Microsoft.XMLDOM");
		res.async=false;
		res.load(url);
		return res;
	}else{
		console.log("cant download xml");
		return false;
	}
}
