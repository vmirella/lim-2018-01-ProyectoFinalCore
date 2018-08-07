window.signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      window.location.assign('view.html')
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('La contraseña es muy débil.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

window.updateVisitor = (visitorId, date, entryTime, departureTime, name, dni, photo, photoUrl, company, employee, reasonForVisit) => {
  // A post entry.
  var visitData = {
    date: date,
		entryTime: entryTime,
    departureTime: departureTime,		
    name: name,
    dni: dni,
    photo: photo,
    photoUrl: photoUrl,
    company: company,
    employee: employee,
    reasonForVisit: reasonForVisit,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }

  var updates = {};

  updates['/visit/' + visitorId] = visitData;
	
	firebase.database().ref().update(updates);
}
