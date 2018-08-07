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
  //Llenando el select de empresas del anfitrion
  getClients()
    .then((snapshot) => {
      snapshot.forEach(element => {
        company.innerHTML += `<option value="${element.key}">${element.val().company}</option>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
//llamar select de empleados en el evento change del primer select
company.addEventListener('change', () => {
  employee.innerHTML = '';
  employee.innerHTML = '<option selected disabled>Trabajador</option>';
  getEmployees(company.value)
  .then((snapshot) => {
    snapshot.forEach(element => {
      employee.innerHTML += `<option value="${element.key}">${element.val().fullname}</option>`;
    });
  })
  .catch((error) => {
    console.log(error);
  });
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


