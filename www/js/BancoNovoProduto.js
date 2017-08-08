(function(){
	
	//metodo para atualizar os dados.
	done.addEventListener('click' , e => {
		
		//Get elements
		const nome = document.getElementById('last_name');
		const quantidade = document.getElementById('icon_telephone');
		
		//Create references
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('estoque');
		
		
		if(parseInt(quantidade.value) < 0){
			alert("ERRO!Valor negativo")
		}
		if (nome.value == "" || quantidade.value == ""){
			alert("Dados vazios")
		}else{
			
			dbRefList.once('value', s =>{
				var a = s.exists();
				
				if(a === true){
					
				}else{
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('estoque/').push({
						nome: nome.value,
						quantidade: parseInt(quantidade.value)
					});
					window.location.replace("estoque.html");
				}
			});
			
			//Sync list changes.metodo de recuperar os dados do usuario.
			dbRefList.on('child_added', snap => {
				
				if(nome.value == snap.val().nome){
					window.location.replace("principal.html");
				}else{
					// adicionar direto. nao tem esse produto no banco.
					firebase.database().ref('estoque/').push({
						nome: nome.value,
						quantidade: parseInt(quantidade.value)
					});
					window.location.replace("estoque.html");
				}
			});
			
		}
		
	});
	
}());