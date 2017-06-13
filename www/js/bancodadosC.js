(function(){
	
	var cor;
	blue.addEventListener('click' , ee =>{
		cor = "blue";
	});
	pink.addEventListener('click' , ez => {
		cor = "pink";
	});
	
	btnNovo.addEventListener('click' , e => {
		
		
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			
			
			if(firebaseUser){
				
				const novoEmail = document.getElementById('emailC');
				const novoPass = document.getElementById('passC'); 
				const novoName = document.getElementById('nameC');
				
				console.log(novoEmail.value, novoName.value, novoPass.value, cor);
				
				
				
				//Create references
				const dbRefObjec = firebase.database().ref();
				const dbRefList = dbRefObjec.child('user');
				
				const user = firebaseUser;
				console.log(user);
				console.log(firebaseUser);
				
				dbRefList.on('child_added', snap => {
					
					if(firebaseUser.email == snap.val().email){
						/*
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
						*/
						user.updateEmail(novoEmail.value).then(function() {
							// Update successful.
							user.updatePassword(novoPass.value).then(function() {
								// Update successful.
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
								
								firebase.auth().signOut();
								window.location.replace("index.html");
							}, function(error) {
								// An error happened.
							});
						}, function(error) {
							// An error happened.
						});
						/*
						user.updatePassword(novoPass.value).then(function() {
							// Update successful.
									firebase.auth().signOut();
									window.location.replace("index.html");
						}, function(error) {
							// An error happened.
						});
						*/
					}
					
				});
				
				
			}else{
				//window.location.replace("index.html");
				console.log("nao logado");
			}
			
		});
	});
}());
