(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCHXij2g0UQRjW1gWew6HZafck96RLFxP8",
		authDomain: "hibaby-c0200.firebaseapp.com",
		databaseURL: "https://hibaby-c0200.firebaseio.com",
		projectId: "hibaby-c0200",
		storageBucket: "hibaby-c0200.appspot.com",
		messagingSenderId: "154530316388"
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
		/* Sign in
		auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("deu erro");
			// ...
		});*/
		const promise = auth.signInWithEmailAndPassword(email, pass);
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