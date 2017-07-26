const user = firebase.auth().currentUser;
const dbRefObjec = firebase.database().ref();
const dbRefList = dbRefObjec.child('user/'+user.uid+'/albuns/'+nomeAlbum);
for (var i = dbRefList.length - 1; i >= 0; i--) {
	document.getElementById("fotos").innerHTML("<div class='col s12'><img class='materialboxed' width='500' height='500' src='"+dbRefList[i]+"'></div>");
};


btFoto.onclick = function (argument) {
	// body...
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.DATA_URL
	});

	function onSuccess(imageData) {
		if(user){
			firebase.database().ref('user/').push({
				name : user.name,
				email : user.email,
				pass : user.pass,
				cor : user.cor,
				img : user.img,
				albuns: {
					nomeAlbum: [imageData]

				}
			});
		}else{
			alert("Usuário não autenticado!");
		}
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}
}