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
						
						produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap2.val().nome + "')>" + "<a href='produto.html'>" + "<li class='collection-item avatar' href='principal.html'>" + "<i class='material-icons circle'>folder</i>" + "<span class='title' id='titulo'>" + snap2.val().nome + "</span>" + "<p>" + snap2.val().quantidade + "</p>" + "</li>" + "</a>" + "</ul>";
						
						
					});
					
					db3.on('child_changed', snap2 => {
						
						produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap2.val().nome + "')>" + "<a href='produto.html'>" + "<li class='collection-item avatar' href='principal.html'>" + "<i class='material-icons circle'>folder</i>" + "<span class='title' id='titulo'>" + snap2.val().nome + "</span>" + "<p>" + snap2.val().quantidade + "</p>" + "</li>" + "</a>" + "</ul>";
					});
					
					//verifica remoçao de dados no firebase e atualiza para a pagina.
					db3.on('child_removed', snap2 => {
						
						produto.innerHTML += "<ul class='collection' onclick=escolhido('" + snap2.val().nome + "')>" + "<a href='produto.html'>" + "<li class='collection-item avatar' href='principal.html'>" + "<i class='material-icons circle'>folder</i>" + "<span class='title' id='titulo'>" + snap2.val().nome + "</span>" + "<p>" + snap2.val().quantidade + "</p>" + "</li>" + "</a>" + "</ul>";
					});
					
				}else{
				}
			}
		});
		
		}else{
		}
	});

}());

function escolhido(titulo) {
		//let lista = ul;
		localStorage.setObject("produto", []);
		//const titulo = ul.getAttribute("titulo")
		
		//console.log(titulo);
		//console.log(titulo.value);
		
		var array = localStorage.getObject("produto");
		array.push(titulo);
		localStorage.setObject("produto", array);
		
		console.log(array);
	}