//Declarando variables
const video = document.getElementById('player'),
  image = document.getElementById('output'),
  capture = document.getElementById('capture'),
  canvas = document.getElementById('canvas'),
  player = document.getElementById('player');

window.onload = () => {
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
  }, (error) => {
    console.log(error);
  })
}

const dbRefPost = firebase.database().ref().child('visit');
// paintVisit.innerHTML = '';
dbRefPost.once('value', visitKey => {
  visitKey.forEach(keys => {
    console.log(keys.key)
  });
})

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
  return new Blob([buffer], { type: mimeString });
}

//Función para guardar la foto
const saveVisitorPhoto = (blob) => {
  var newPostKey = firebase.database().ref().child('posts').push().key;

  firebase.storage().ref().child(newPostKey).put(blob).then(result => {
    console.log(result.metadata.downloadURLs[0]);
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
  image.setAttribute('src', imagUrl)
  const blob = dataURItoBlob(imagUrl);
  saveVisitorPhoto(blob);
}

capture.addEventListener('click', takeSnapshot)