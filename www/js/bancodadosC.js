(function(){
	
	
	var cor;
	blue.addEventListener('click' , ee =>{
		cor = "blue";
		console.log(cor);
	});
	pink.addEventListener('click' , ez => {
		cor = "pink";
		console.log(cor);
	});
	
	btnNovo.addEventListener('click' , e => {
		
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			if(firebaseUser){
				let novoEmail = document.getElementById('emailC');
				let novoPass = document.getElementById('passC'); 
				let novoName = document.getElementById('nameC');
				
				console.log(novoEmail.value, novoName.value, novoPass.value);
				
				console.log(cor);
				
				//Create references
				const dbRefObjec = firebase.database().ref();
				const dbRefList = dbRefObjec.child('user');
				
				const user = firebaseUser;
				
				dbRefList.on('child_added', snap => {
					
					if(firebaseUser.email == snap.val().email){
						
						const novo = {
							name : novoName.value,
							email : novoEmail.value,
							pass : novoPass.value,
							cor : cor,
							img : snap.val().img
						}
						
						var updates = {};
						
						updates['user/' + snap.key] = novo;
						
						firebase.database().ref().update(updates);
						
						console.log(snap.key);
						
						user.updateEmail(novoEmail.value).then(function() {
							// Update successful.
						}, function(error) {
							// An error happened.
						});
						
						user.updatePassword(novoPass.value).then(function() {
							// Update successful.
									firebase.auth().signOut();
									window.location.replace("index.html");
						}, function(error) {
							// An error happened.
						});
						
					}
					
				});
				
				
			}else{
				
			}
			
		});
		
		
		
		//user.updateEmail(novoEmail).then(function() {
			// Update successful.
		//}, function(error) {
			// An error happened.
		//});
		
		//user.updatePassword(novoPass).then(function() {
			// Update successful.
		//}, function(error) {
			// An error happened.
		//});
		
		//const dbRefObjec = firebase.database().ref();
		
		//dbRefObjec.on('value', snap => {
		
		//var novo = snap.val();
		
		//console.log(novo.user);
		//});
		
		
		//firebase.database().ref().update(novo);
		
	});
}());
