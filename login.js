const token = sessionStorage.getItem('token');

if ((!token) || (token == 'undefined')) {
    window.location.href = './index.html';
}
/* const exitSite = document.querySelector('#exitBtn');

exitSite.addEventListener('click', (event) => {
    event.preventDefault();
    login();
  }); */
