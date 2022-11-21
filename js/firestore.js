const membrosCollection = firebase.firestore().collection('membros');
membrosCollection.get().then((querySnapshot) => {
    const membrosJson = querySnapshot.docs.map((doc) => doc.data());
    console.log(membrosJson);
});