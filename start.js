const productIP = document.querySelector('#inpProduct');
const productPass = document.querySelector('#inpPass');
const productSubmit = document.querySelector('#log');

async function login() {
  try {
      const res = await fetch("https://c02584c6ba10fa08.mokky.dev/auth", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: productIP.value,
            password: productPass.value,
          })
        });

        const data = await res.json()
        sessionStorage.setItem('token', data.token);
        console.log(data);

        const token = sessionStorage.getItem('token');

        if (token !== 'undefined') {
          window.location.href = './start.html';
      }

  } catch(error) {
      console.error(`Ошибка ${error}`);
  };
}

productSubmit.addEventListener('click', (event) => {
  event.preventDefault();
    login();
    // window.location.href = './start.html';
});