let password = '';
let login = '';
document.querySelector('.submit_data').disabled = true;

document.querySelector('.login').addEventListener('input', (e) => {
    login = e.target.value;
});

document.querySelector('.password').addEventListener('input', (e) => {
    password = e.target.value;
});


document.querySelector('.reg').addEventListener('input', (e) => {
    if(login != '' && password != '') {
        document.querySelector('.submit_data').disabled = false;
    } else {
        document.querySelector('.submit_data').disabled = true;
    }
})

document.querySelector('.submit_data').addEventListener('click', () => {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.length == 0) {
            alert('Введены неверные данные');
        } else {
            sessionStorage.setItem('user', JSON.stringify({login: response[0].login, mail: response[0].mail}));
            window.location.href = "index.html";
        }
      });
})
