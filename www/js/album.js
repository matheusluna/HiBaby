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

        criar.onclick = function(){
          var nome = document.getElementById("nomeAlbum").value;
          firebase.database().ref('user/'+ snap.key+'/Albuns').push({
            nomeAlbum: nome
          }).key;
        }
        
        if(snap.val().Albuns){
          
          const db2 = firebase.database().ref('user/'+ snap.key + '/');
          const db3 = db2.child('Albuns');
          
          
          db3.on('child_added', snap2 => {
            
            albuns.innerHTML += '<div id="'+snap2.val().nomeAlbum+'" class="card album"><div class="card-image"><img src="img/paisagem.jpg"><span class="card-title">'+snap2.val().nomeAlbum+'</span></div><div class="card-action"><a class="entrar" href="album.html?nomeAlbum='+snap2.val().nomeAlbum+'&idAlbum='+snap2.key+'">Entrar</a><a class="edit btn-floating green activator waves-effect waves-light btn"><i class="material-icons">mode_edit</i></a><a class="delete btn-floating blue waves-effect waves-light"><i class="material-icons">delete</i></a></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Editar Albúm<i class="material-icons right">close</i></span><form><div class="input-field"><input class="validate" type="text" id="nomeAlbumNovo"><label for="nomeAlbum">Novo nome</label></div><input type="submit" class="editar btn green waves-effect waves-light btn" value="Salvar"></form></div></div>';
            
            
          });
          
          db3.on('child_changed', snap2 => {
            
            albuns.innerHTML += '<div id="'+snap2.val().nomeAlbum+'" class="card album"><div class="card-image"><img src="img/paisagem.jpg"><span class="card-title">'+snap2.val().nomeAlbum+'</span></div><div class="card-action"><a class="entrar" href="album.html?nomeAlbum='+snap2.val().nomeAlbum+'&idAlbum='+snap2.key+'">Entrar</a><a class="edit btn-floating green activator waves-effect waves-light btn"><i class="material-icons">mode_edit</i></a><a class="delete btn-floating blue waves-effect waves-light"><i class="material-icons">delete</i></a></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Editar Albúm<i class="material-icons right">close</i></span><form><div class="input-field"><input class="validate" type="text" id="nomeAlbumNovo"><label for="nomeAlbum">Novo nome</label></div><input type="submit" class="editar btn green waves-effect waves-light btn" value="Salvar"></form></div></div>';
          });
          
          //verifica remoçao de dados no firebase e atualiza para a pagina.
          db3.on('child_removed', snap2 => {
            
            document.getElementById(snap2.val().nomeAlbum).innerHTML = '';
          });
          
        }else{
        }
      }
    });
    
    }else{
    }
  });

}());