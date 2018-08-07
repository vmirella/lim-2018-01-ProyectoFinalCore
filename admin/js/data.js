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