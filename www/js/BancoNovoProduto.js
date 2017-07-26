(function(){
	
	//metodo para atualizar os dados.
	done.addEventListener('click' , e => {
		
		// Add a realtime listener. Esse metodo onAuthStateChanged e para saber em tempo real si o usuario esta logado ou nao.
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			
			
			//verifico si tem usuario on.
			if(firebaseUser){
				
				//Get elements
				const nome = document.getElementById('last_name');
				const quantidade = document.getElementById('icon_telephone');
				
				//Create references
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
								
								if(nome.value == snap2.val().nome){
									
									const novo = {
										nome : nome.value,
										quantidade : parseInt(quantidade.value) + snap2.val().quantidade
									}
									
									var updates = {};
									
									updates['user/' + snap.key + '/Estoque/' + snap2.key] = novo;
									
									//metodo para atualizar os dados.
									firebase.database().ref().update(updates);
									
								}else{
									// adicionar direto. nao tem esse produto no banco.
									firebase.database().ref('user/' + snap.key + '/Estoque').push({
										nome: nome.value,
										quantidade: parseInt(quantidade.value)
									}).key;
								}
								
							});
							
						}else{
							
							firebase.database().ref('user/'+ snap.key + '/Estoque').push({
								nome : nome.value,
								quantidade : parseInt(quantidade.value)
							}).key;
						}
					
					}
					
				});
				
			}else{
				
			}
			
		});
	});
	
}());