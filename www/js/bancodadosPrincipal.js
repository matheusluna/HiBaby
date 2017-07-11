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
	//const img = document.getElementById('img');
	//const name = document.getElementById('name');
	//const email = document.getElementById('email');
	
	//Create references

	// Get elements
	const btnLogout = document.getElementById('buttonLogout');
	
	
	// Add Logout
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
		window.location.replace("index.html");
	});
	
	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			//console.log(firebaseUser.email);
			//const id = firebaseUser.email;
			//var pos = id.search("@");
			//var res = id.slice(0, pos);
			
			// Get elements
			const img = document.getElementById('img');
			const name = document.getElementById('name');
			const email = document.getElementById('email');
			
			//Create references
			const dbRefObjec = firebase.database().ref();
			const dbRefList = dbRefObjec.child('user');
			
			
			//dbRefObjec.on('value', snap => console.log(snap.val()));
			//dbRefList.on('value', snap => console.log(snap.val()));
			
			//Sync list changes
			dbRefList.on('child_added', snap => {
				
				if(firebaseUser.email == snap.val().email){
					
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
					
					var cor = snap.val().cor;
					
					if(cor == "pink"){
						document.getElementById('inicio').className = 'nav-wrapper pink lighten-3';
					}else{
						document.getElementById('inicio').className = 'nav-wrapper blue lighten-3';
					}
					
					//document.getElementById('inicio').className = 'nav-wrapper pink lighten-3';
				}
				
				
				
				//if(snap.key == res){
					//console.log("deu certo");
					//document.getElementById("name").innerHTML = snap.val().name;
					//document.getElementById("email").innerHTML = snap.val().email;
					//document.getElementById("img").src = snap.val().img;
				//}
				
				
				//document.getElementById("name").innerHTML = snap.val().name;
				//document.getElementById("email").innerHTML = snap.val().email;
				//document.getElementById("img").innerHTML = snap.val().img;
				//console.log(snap.val());
				//var valor = snap.val();
				//console.log(snap.key);
				//console.log(valor);
				
			});
			
			dbRefList.on('child_changed', snap => {
				
				
				if(firebaseUser.email == snap.val().email){
					//console.log("deu certo");
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
				}else{
					alert("Dados incorretos!")
				}
			});
			
			dbRefList.on('child_removed', snap => {
				
				if(firebaseUser.email == snap.val().email){
					//console.log("deu certo");
					document.getElementById("name").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = snap.val().img;
				}
			});
			
			
			//console.log(res);
			console.log("Esta logado");
		}else{
			//window.location.replace("index.html");
			console.log('Nao logando');
		}
	});
}());