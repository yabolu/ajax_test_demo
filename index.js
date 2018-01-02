

var index = 1;
var isRequest = false;

loadMore.addEventListener('click', function(){
	if(!isRequest){
		isRequest = true;
		var url = './page' + index + '.json';
		var xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);
	  	xhr.onload = function(){
	  		isRequest = false;
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
				var result = JSON.parse(xhr.responseText);
				var hasNext = result.hasNext;
				var data = result.data;
				var ul = document.querySelector('.content-list');

				for(var i=0; i<data.length; i++){
					var li = document.createElement('li');
					li.textContent = data[i];
					ul.appendChild(li);
				}
				if(hasNext){
					index++;
				}else {
					loadMore.disabled = true;
				}

			}
		}

		xhr.send();
	}
});
