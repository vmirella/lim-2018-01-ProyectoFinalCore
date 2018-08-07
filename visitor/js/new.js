// let date, entryTime, name, dni, photo, photoUrl, employee, reasonForVisit, observations;
let entryDate = document.getElementById('dateVisit');
let entryTime = document.querySelector('#entryTimeVisit');
let name = document.querySelector('#nameVisit');
let dni = document.querySelector('#dniVisit');
let setFile = document.querySelector('#selectPhoto');
let company = document.querySelector('#company');
let employee = document.querySelector('#employee');
let reasonForVisit = document.querySelector('#reasonForVisit');
let observations = document.querySelector('#observations');
const submitVisit = document.querySelector('#submit');
const takePhoto = document.querySelector('#takePhoto');
const getOut = document.querySelector('#getOut');
const btnClose = document.querySelector('#btnClose');
const video = document.getElementById('player'),
  image = document.getElementById('output'),
  capture = document.getElementById('capture'),
  canvas = document.getElementById('canvas'),
  player = document.getElementById('player');

function reload() {
  window.location.reload();
};

takePhoto.addEventListener('click', () => {
  //Activando la camara
  navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
  navigator.getMedia({
    video: true,
    audio: false
  }, (stream) => {
    //URL local de la foto
    video.src = window.URL.createObjectURL(stream);
    video.autoplay = true;
    //video.play();
    var track = stream.getTracks()[0]; // if only one media track
    stopCamera(track)
  }, (error) => {
    console.log(error);
  })
});
const stopCamera = (track) => {
  getOut.addEventListener('click', () => {
    track.stop();
  })
  btnClose.addEventListener('click', () => {
    track.stop();
  })
}
const dataURItoBlob = (dataURI) => {
  // Convertir base64 en datos binarios sin procesar en una cadena
  // No maneja los URI de datos URLEncoded
  const byteString = atob(dataURI.split(',')[1]);
  // Neparar el componente
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // Escribe los bytes de la cadena en un ArrayBuffer
  const buffer = new ArrayBuffer(byteString.length);
  const view = new DataView(buffer);
  for (let i = 0; i < byteString.length; i++) {
    view.setUint8(i, byteString.charCodeAt(i));
  }
  // Escribe ArrayBuffer en un blob y listo
  return new Blob([buffer], {
    type: mimeString
  });
}

//Función para guardar la foto
const saveVisitorPhoto = (blob) => {
  var photoKey = firebase.database().ref().child('photo').push().key;
  firebase.storage().ref().child(photoKey).put(blob).then(result => {
    let url = result.metadata.downloadURLs[0];
    newVisitEntry(photoKey, url);
  });
}
//Función capturar foto
const takeSnapshot = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  const context = canvas.getContext('2d')
  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);
  const imagUrl = canvas.toDataURL('image/png')
  // image.setAttribute('src', imagUrl)
  const blob = dataURItoBlob(imagUrl);
  saveVisitorPhoto(blob);
}

capture.addEventListener('click', takeSnapshot)

window.onload = () => {
  //Mostrar fecha y hora del sistema
  entryDate.value = new Date().toString("yyyy-MM-dd");
  entryTime.value = new Date().toString("hh:mm");


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
    var selectedCompany = company.options[company.selectedIndex].text;
    var selectedEmployee = employee.options[employee.selectedIndex].text;
    entryDate = entryDate.value;
    entryTime = entryTime.value;
    name = name.value;
    dni = dni.value;
    company = selectedCompany;
    employee = selectedEmployee;
    reasonForVisit = reasonForVisit.value;

    newVisit(entryDate, entryTime, name, dni, photo, photoUrl, company, employee, reasonForVisit, );

    setTimeout(() => {
      window.location.href = 'successful.html';
    }, 2000)
    // reload();
  });
};
