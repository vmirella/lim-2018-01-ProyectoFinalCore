const paintVisit = document.querySelector('#paintVisit');
const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})

const dbRefPost = firebase.database().ref().child('visit');
// paintVisit.innerHTML = '';
dbRefPost.once('value', visitKey => {
  visitKey.forEach(keys => {
    visitId = keys.key;
    console.log(visitId);
    paintingVisit(keys);
  });
})

const paintingVisit = (visitId) => {
  console.log(visitId.val().name)
  let visit = document.createElement('tr');
  visit.innerHTML = `
    <td>${visitId.val().name}</td>
    <td>${visitId.val().date}</td>
    <td>${visitId.val().entryTime}</td>
    <td>
      <button type="submit" class="btn btn-outline-danger">salir</button>
    </td>
  `;
  paintVisit.appendChild(visit);
}