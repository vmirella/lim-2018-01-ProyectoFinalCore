// let date, entryTime, name, dni, photo, photoUrl, employee, reasonForVisit, observations;
let date = document.getElementById('dateVisit');
let entryTime = document.querySelector('#entryTimeVisit');
let name = document.querySelector('#nameVisit');
let dni = document.querySelector('#dniVisit');
let setFile = document.querySelector('#selectPhoto');
let employee = document.querySelector('#employee');
let reasonForVisit = document.querySelector('#reasonForVisit');
let observations = document.querySelector('#observations');
const submitVisit = document.querySelector('#submit');
// const settingPhoto = () => {
setFile.addEventListener('change', function (e) {
  alert('Wait a minute please')
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('visit-photo/' + file.name);
  // var databaseRef = firebase.storage().ref('post-images/');
  var task = storageRef.put(file);
  task.on('state_changed',
    function (snapshot) {
      /* var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage; */
    },
    function error(err) {},
    function () {
      task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        fileName = file.name;
        fileUrl = downloadURL;
        newVisitEntry(fileName, fileUrl);
        console.log('File available at', downloadURL);
        alert('Now you can continue')
      });
    }
  )
})
// };

const newVisitEntry = (photo, photoUrl) => {
  submitVisit.addEventListener('click', () => {
    date = date.value;
    entryTime = entryTime.value;
    name = name.value;
    dni = dni.value;
    employee = employee.value;
    reasonForVisit = reasonForVisit.value;
    observations = observations.value;

    newVisit(date, entryTime, name, dni, photo, photoUrl, employee, reasonForVisit, observations);

  });
};

window.newVisit = (date, entryTime, name, dni, photo, photoUrl, employee, reasonForVisit, observations) => {
  // A post entry.
  var visitData = {
    date: date,
    entryTime: entryTime,
    name: name,
    dni: dni,
    photo: photo,
    photoUrl: photoUrl,
    employee: employee,
    reasonForVisit: reasonForVisit,
    observations: observations,
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
