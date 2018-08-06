const logIn = document.querySelector('#logIn');
const getEmail = document.querySelector('#validationTooltipUsername');
const getPassword = document.querySelector('#validationTooltipPassword');

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.assign('view.html')
    } else {
      console.log('No user is signed in.');
    }
  });
}
logIn.addEventListener('click', () => {
  const callback = (error, response) => {
    if (!error) {
      window.location.assign('view.html')
    } else {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    }
  }
  signInUser(getEmail.value, getPassword.value,callback);
})
window.signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    window.location.assign('view.html')
  })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};