const token = sessionStorage.getItem('token');

if ((!token) || (token == 'undefined')) {
    window.location.href = './start.html';
}
