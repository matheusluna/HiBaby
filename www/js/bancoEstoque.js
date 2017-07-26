(function(){
	
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
		
		
		//Create references. referencia do bando de dados do firebase.
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('user');
		
		//Sync list changes.metodo de recuperar os dados do usuario.
		dbRefList.on('child_added', snap => {
			
			//testo para saber qual e os dados que serao modificados.
			if(firebaseUser.email == snap.val().email){
				
				if(snap.val().Estoque){
					
					const db2 = firebase.database().ref('user/'+ snap.key + '/');
					const db3 = db2.child('Estoque');
					
					db3.on('child_added', snap2 => {
						
						produto.innerHTML += "<ul class='collection'>" + "<a href='produto.html'>" + "<li class='collection-item avatar' href='principal.html'>" + "<i class='material-icons circle'>folder</i>" + "<span class='title'>" + snap2.val().nome + "</span>" + "<p>" + snap2.val().quantidade + "</p>" + "</li>" + "</a>" + "</ul>";
						
					});
					
				}else{
				}
			}
		});
		
		}else{
		}
	});
	
}());