(function(){
	
	//metodo para atualizar os dados.
	done.addEventListener('click' , e => {
		
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
								
								const retirada = document.getElementById('last_name');
								var array = localStorage.getObject("produto");
								
								
								if(snap2.val().nome == array[0]){
									
									
									if((snap2.val().quantidade - parseInt(retirada.value)) >= 0){
											
										const novo = {
											nome : snap2.val().nome,
											quantidade : snap2.val().quantidade - parseInt(retirada.value)
										}
										
										var updates = {};
										
										updates['user/' + snap.key + '/Estoque/' + snap2.key] = novo;
										
										//metodo para atualizar os dados.
										firebase.database().ref().update(updates);
									}else{
										
										alert("Valor incorreto!")
									}
									
								}
								
							});
							
						}else{
						}
					}
				});
				
			}
			
		});
	});
	
}());