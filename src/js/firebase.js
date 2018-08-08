var config = {
	apiKey: "AIzaSyAt-lvHjfjUVd0Urz1i1JxbmnjSkjrJw4E",
	authDomain: "visitame-8b1e9.firebaseapp.com",
	databaseURL: "https://visitame-8b1e9.firebaseio.com",
	projectId: "visitame-8b1e9",
	storageBucket: "visitame-8b1e9.appspot.com",
	messagingSenderId: "658184057823"
};
firebase.initializeApp(config);

const logOut = document.querySelector('#logOut');

logOut.addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})