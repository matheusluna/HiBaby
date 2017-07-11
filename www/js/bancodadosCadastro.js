(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDTgFfL8QZU6kA1q9Jc9I4Lu24CuaQiJEs",
		authDomain: "hibaby-1bebf.firebaseapp.com",
		databaseURL: "https://hibaby-1bebf.firebaseio.com",
		projectId: "hibaby-1bebf",
		storageBucket: "hibaby-1bebf.appspot.com",
		messagingSenderId: "9227781946"
	};
	firebase.initializeApp(config);
	
	var cor;
	blue.addEventListener('click' , ee =>{
		cor = "blue";
	});
	pink.addEventListener('click' , ez => {
		cor = "pink";
	});
	
	const novoEmail = document.getElementById('email');
	const novoPass = document.getElementById('password');
	const novoName = document.getElementById('first_name');
	
	
	const auth = firebase.auth();
	
	btnNovo.addEventListener('click' , e => {
		
		auth.createUserWithEmailAndPassword(novoEmail.value, novoPass.value).then(function(){
			// Update successful.
			
			firebase.database().ref('user/').push({
				name : novoName.value,
				email : novoEmail.value,
				pass : novoPass.value,
				cor : cor,
				img : "img"
			});
			
			alert("Cadastro feito com sucesso!")
		}, function(error) {
			// An error happened.
			if(document.getElementById("email").value == "" || document.getElementById("password").value == "" ){
				alert("Preencha as campos vazios!")
			}else{
				alert("Dados incorretos")
			}
		});
	});
	/*
	const novo = {
		name : novoName.value,
		email : novoEmail.value,
		pass : novoPass.value,
		cor : cor,
		img : img.img
	}
			
			var updates = {};
			
			updates['user/' + snap.key] = novo;
			
			firebase.database().ref().update(updates);
			
			firebase.auth().signOut();
			window.location.replace("index.html");
	*/
}());