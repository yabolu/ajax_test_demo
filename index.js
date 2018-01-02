function ajax(opts){
	var url = opts.url;
	var type = opts.type || 'GET';
	var dataType = opts.dataType || 'json';
	var onsuccess = opts.onsuccess || function(){};
	var onerror = opts.onerror || function(){};
	var data = opts.data || {};

	var dataStr = [];
	for(var key in data){
		dataStr.push(key + '=' + data[key]);
	}
	dataStr = dataStr.join('&');

	if(type === 'GET'){
		url += '?' + dataStr;
	}

	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.onload = function(){
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
			if(dataType === 'json'){
				onsuccess(JSON.parse(xhr.responseText));
			}else{
				onsuccess(xhr.responseText);
			}
		}else {
			onerror = onerror();
		}
	}

	if(type === 'POST'){
		xhr.send(dataStr);
	}else {
		xhr.send();
	}
}

var i = 1;

loadMore.addEventListener('click', function(){
  var url = './page' + i + '.json';

  var onsuccess = function(result){
  	var ul = document.querySelector('.content-list');
  	for(var i=0;i<result.length; i++){
  		var li = document.createElement('li');
  		console.log(result[i]);
  		li.textContent = result[i];
  		ul.appendChild(li);
  	}
  }

  var opts = {
  	onsuccess: onsuccess, 
  	url: url
  }

  ajax(opts);



});
