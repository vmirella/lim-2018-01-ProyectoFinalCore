//Registra nueva visita
window.newVisit = (date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit) => {
  // A post entry.
  var visitData = {
    date: date,
    entryTime: entryTime,
    departureTime: '-',	
    name: name,
    dni: dni,
    photo: photo,
    photoUrl: photoUrl,
    company: company,
    employee: employee,
    reasonForVisit: reasonForVisit,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }
  // Get a key for a new Post.
  var newVisitKey = firebase.database().ref().child('visit').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/visit/' + newVisitKey] = visitData;

  firebase.database().ref().update(updates);

  return newVisitKey;
};

//Listar las empresas de los clientes
window.getClients = () => {
	//retorna un objeto con la lista de clientes
	return firebase.database().ref('clients').once('value');
};
//Listar los empleados segun el cliente elegido
window.getEmployees = (uidClient) => {
	return firebase.database().ref('employees').orderByChild('uid').equalTo(uidClient).once('value');
};

/* const createEmployees = () => {
	const id = firebase.database().ref().child('employees').push().key;

	firebase.database().ref('employees/' + id).set({
		fullname: 'Maria Paula Rivarola',
		uid: "-LJC5kBGvC-BBmDKVnQa"
	}, function(error) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });

};

const updateEmployees = (uidEmployed) => {
	firebase.database().ref('employees/' + uidEmployed).update({
		fullname: 'Gonzalo Parra',
		uid: 'LJC5kBGvC-BBmDKVnQa'
	}, function(error) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });

}; */

window.signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      window.location.assign('view.html');
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);  
    });
    return true;
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
	
	return firebase.database().ref().update(updates);
}
