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

	
	// Get elements
	const Email = document.getElementById('email');
	const Password = document.getElementById('password');
	const btnSignIn = document.getElementById('buttonSignIn');
	// Add login event
	btnSignIn.addEventListener('click', e => {
		// Get email and pass
		const email = Email.value;
		const pass = Password.value;
		const auth = firebase.auth();

		auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
			// Handle Errors here.
			if (email == ""||pass == "") {
				alert("Preencha os dados vazios!")
			}else{
				alert("Dados incorretos!")
			}
			// ...
		});
		//const promise = auth.signInWithEmailAndPassword(email, pass);
		/* Add a realtime listener
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			if(firebaseUser){
				window.location.replace("principal.html");
				console.log("Esta logado");
			}else{
				promise.catch(e => console.log(e.message));
				console.log('Nao logando');
			}
		});*/
		//if(promise.W == 3){
			//console.log("deu errado");
		//}else{
			//console.log("deu certo");
		//}
		//promise.catch(e => console.log(e.message));
		//console.log("nao deu erro");
		//console.log(promise);
		//window.location.replace("principal.html");
		//promise.try(e => window.location.replace("principal.html"));
		//promise.catch(e => console.log(e.message));
		
	});
	
	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log(firebaseUser);
			window.location.replace("principal.html");
			console.log("Esta logado");
		}else{
			console.log('Nao logando');
		}
	});
	
}());