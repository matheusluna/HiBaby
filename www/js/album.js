const user = firebase.auth().currentUser;
const dbRefObjec = firebase.database().ref();
const dbRefList = dbRefObjec.child('user/'+user.uid+'/albuns');
for (var i = dbRefList.length - 1; i >= 0; i--) {
	document.getElementById("albuns").innerHTML('<div class="card album">
              <div class="card-image">
                <img src="img/paisagem.jpg">
                <span class="card-title">'dbRefList[i].name'</span>
              </div>
              <div class="card-action">
                <a>Entrar</a>
                <a class="btn-floating green activator waves-effect waves-light btn"><i class="material-icons">mode_edit</i></a>
                <a class="btn-floating blue waves-effect waves-light"><i class="material-icons">delete</i></a>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Editar Albúm<i class="material-icons right">close</i></span>
                <form>
                  <div class="input-field">
                    <input class="validate" type="text" id="nomeAlbum">
                    <label for="nomeAlbum">Novo nome</label>
                  </div>
                  <input type="submit" class="editar btn green waves-effect waves-light btn" value="Salvar">
                </form>
              </div>
            </div>');
};
criar.onclick = function(){
	const nome = document.getElementById("nomeAlbum").value;
	const dbRefList = dbRefObjec.child('user/'+user.uid+'/albuns');
	dbRefList.Patch(nome)
}