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

reload = () => {
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
    function error(err) { },
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

window.onload = () => {
  getClients()
    .then((snapshot) => {
      //console.log(snapshot);
      snapshot.forEach(element => {
        console.log("ddd"+element);
        console.log(element.val().company)
        company.innerHTML += `<option value = "${element}">${element.val().company}</option>`;
        /* element.forEach(e => {
          console.log(e.val().company)
        }) */
      });
      //imprimir los clientes en el sitio deseado
    })
    .catch((error) => {
      console.log(error);
    });
}


//llamar en el evento change del primer select
getEmployees('LJC5kBGvC-BBmDKVnQa')
  .then((snapshot) => {
    console.log(snapshot.val());
    //imprimir los clientes en el sitio deseado
  })
  .catch((error) => {
    console.log(error);
  });

const newVisitEntry = (photo, photoUrl) => {
  submitVisit.addEventListener('click', () => {
    date = date.value;
    entryTime = entryTime.value;
    name = name.value;
    dni = dni.value;
    company = company.value;
    employee = employee.value;
    reasonForVisit = reasonForVisit.value;

    newVisit(date, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit, );

    // reload();
  });
};


