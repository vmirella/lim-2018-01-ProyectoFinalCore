var config = {
	apiKey: "AIzaSyAt-lvHjfjUVd0Urz1i1JxbmnjSkjrJw4E",
	authDomain: "visitame-8b1e9.firebaseapp.com",
	databaseURL: "https://visitame-8b1e9.firebaseio.com",
	projectId: "visitame-8b1e9",
	storageBucket: "visitame-8b1e9.appspot.com",
	messagingSenderId: "658184057823"
};
firebase.initializeApp(config);

//Ejemplo de como llamar la funcion
getClients()
.then((snapshot) => {
	console.log(snapshot.val());
	//imprimir los clientes en el sitio deseado
})
.catch((error) => {
	console.log(error);
});

getEmployees('LJC5kBGvC-BBmDKVnQa')
.then((snapshot) => {
	console.log(snapshot.val());
	//imprimir los clientes en el sitio deseado
})
.catch((error) => {
	console.log(error);
});

//createEmployees();