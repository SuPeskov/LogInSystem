const token = sessionStorage.getItem('token');

if ((!token) || (token == 'undefined')) {
    window.location.href = 'https://supeskov.github.io/LogInSystem/';
} 
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });