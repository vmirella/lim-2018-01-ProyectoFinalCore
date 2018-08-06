//Listar las empresas de los clientes
window.getClients = () => {
	//retorna un objeto con la lista de clientes
	return firebase.database().ref('clients').once('value');
};
//Listar los empleados segun el cliente elegido
window.getEmployees = (uidClient) => {
	return firebase.database().ref('employees').orderByChild('uid').equalTo(uidClient).once('value');
};

/*const createEmployees = () => {
	const id = firebase.database().ref().child('employees').push().key;

	firebase.database().ref('employees/' + id).set({
		fullname: 'Gonzalo Parra',
		uid: 'LJC5kBGvC-BBmDKVnQa'
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

};*/