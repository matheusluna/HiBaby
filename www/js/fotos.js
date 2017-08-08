(function(){
	
	btFoto.onclick = function (argument) {
		// body...
		navigator.camera.getPicture(onSuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.DATA_URL
	})};
	
	function onSuccess(imageData) {
		
		//Create references. referencia do bando de dados do firebase.
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('albuns');
		
		//Sync list changes.metodo de recuperar os dados do usuario.
		dbRefList.on('child_added', snap => {
			
			//testo para saber qual e os dados que serao modificados.
			if(idAlbum == snap.key){
				const db2 = firebase.database().ref('albuns/'+ snap.key + '/');
				const db3 = db2.child('fotos');
				
				db3.push({
					url: imageData
				}).key;
				
				db3.on('child_added', snap2 => {
					
					albuns.innerHTML += "<div id='" + snap2.key +"' class='col s12'><img class='materialboxed' width='500' height='500' src='"+snap2.url+"'></div>";
					
				});
				
				db3.on('child_changed', snap2 => {
					
					albuns.innerHTML += "<div id='" +snap2.key+"' class='col s12'><img class='materialboxed' width='500' height='500' src='"+snap2.url+"'></div>";
				});
				
				//verifica remoçao de dados no firebase e atualiza para a pagina.
				db3.on('child_removed', snap2 => {
					
					document.getElementById(snap2.key).innerHTML = '';
				});
				
			}
		});
	}
	
	function onFail(message) {
		alert('Failed because: ' + message);
	}
}());