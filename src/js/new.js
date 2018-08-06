// let date, entryTime, name, dni, photo, photoUrl, employee, reasonForVisit, observations;
let date = document.getElementById('dateVisit');
let entryTime = document.querySelector('#entryTimeVisit');
let name = document.querySelector('#nameVisit');
let dni = document.querySelector('#dniVisit');
let setFile = document.querySelector('#selectPhoto');
let company = document.querySelector('#company');
let employee = document.querySelector('#employee');
let reasonForVisit = document.querySelector('#reasonForVisit');
let observations = document.querySelector('#observations');
const submitVisit = document.querySelector('#submit');

const reload = () => {
  window.location.reload();
};

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
    company = company.value;
    employee = employee.value;
    reasonForVisit = reasonForVisit.value;

    newVisit(date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit,);

    reload();
  });
};

window.newVisit = (date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit) => {
  // A post entry.
  var visitData = {
    date: date,
    entryTime: entryTime,
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
