(function(){
	
	//Create references. referencia do bando de dados do firebase.
	const dbRefObjec = firebase.database().ref();
	const dbRefList = dbRefObjec.child('albuns');
	
	localStorage.setObject("albuns", []);
	
	//Sync list changes.metodo de recuperar os dados do usuario.
	dbRefList.on('child_added', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum='"+ snap.val().nome +"'&idAlbum='"+ snap.key +"''>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light'>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='nomeAlbumNovo'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<input type='submit' class='editar btn green waves-effect waves-light btn' value='Salvar'>" +
						"</form>" +
					"</div>" +
					"</div>";
		adde(snap.val().nome);
	});
	
	dbRefList.on('child_changed', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum='"+ snap.val().nome +"'&idAlbum='"+ snap.key +"''>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light'>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='nomeAlbumNovo'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<input type='submit' class='editar btn green waves-effect waves-light btn' value='Salvar'>" +
						"</form>" +
					"</div>" +
					"</div>";
		
	});
	
	dbRefList.on('child_removed', snap => {
		
		albuns.innerHTML += "<div id='"+ snap.val().nome + "' class='card album'>" +
					"<div class='card-image'>" +
						"<img src='img/paisagem.jpg'>" +
						"<span class='card-title'>"+ snap.val().nome +"</span>" +
					"</div>" +
					"<div class='card-action'>" +
						"<a class='entrar' href='album.html?nomeAlbum='"+ snap.val().nome +"'&idAlbum='"+ snap.key +"''>Entrar</a>" +
						"<a class='edit btn-floating green activator waves-effect waves-light btn'>" +
							"<i class='material-icons'>mode_edit</i>" +
						"</a>" +
						"<a class='delete btn-floating blue waves-effect waves-light'>" +
							"<i class='material-icons'>delete</i>" +
						"</a>" +
					"</div>" +
					"<div class='card-reveal'>" +
						"<span class='card-title grey-text text-darken-4'>Editar Albúm<i class='material-icons right'>close</i></span>" +
						"<form>" +
							"<div class='input-field'>" +
								"<input class='validate' type='text' id='nomeAlbumNovo'>" +
								"<label for='nomeAlbum'>Novo nome</label>" +
							"</div>" +
							"<input type='submit' class='editar btn green waves-effect waves-light btn' value='Salvar'>" +
						"</form>" +
					"</div>" +
					"</div>";
		
	});
	
	criar.addEventListener('click' , ss => {
		var nome = document.getElementById("nomeAlbum").value;
		
		//Create references
		const dbRefObjec = firebase.database().ref();
		const dbRefList = dbRefObjec.child('albuns');
		
		var array = localStorage.getObject("albuns");
		var confimar = false;
		
		for(var i=0; i<array.length; i++){
			if(nome == array[i]){
				confimar = true;
			}
		}
		
		if (nome == ""){
			alert("Dado vazio")
		}else if(confimar == true){
			
			alert("Ja exite esse album");
		}else{
			
			dbRefList.once('value', s =>{
				var a = s.exists();
				
				if(a === true){
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('albuns/').push({
						nome: nome
					});
					
				}else{
					
					// adicionar primeira vez. nao tem esse produto no banco.
					firebase.database().ref('albuns/').push({
						nome: nome
					});
				}
			});
			
		}
		
	});
	
}());

function adde(nome){
	
	var array = localStorage.getObject("albuns");
	array.push(nome);
	localStorage.setObject("albuns", array);
	
}