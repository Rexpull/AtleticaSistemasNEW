const membrosCollection = firebase.firestore().collection('membros');
membrosCollection.get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
        const membroJson = doc.data();

        const template = document.querySelector("#membrosCardsTemplate");
        const copy = template.content.cloneNode(true);
        copy.querySelector('.name-dir .name').innerHTML = membroJson.nome;
        copy.querySelector('.name-dir .nickname').innerHTML = membroJson.apelido;
        copy.querySelector('.name-dir .description').innerHTML = membroJson.cargo;
        template.parentNode.appendChild(copy);
    });

});