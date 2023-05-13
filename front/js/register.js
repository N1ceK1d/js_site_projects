let password = '';
let repeat = '';
document.querySelector('.submit_data').disabled = true;

document.querySelector('.pass').addEventListener('input', (e) => {
    password = e.target.value;
});

document.querySelector('.rep_pass').addEventListener('input', (e) => {
    repeat = e.target.value;
});

document.querySelector('.login').addEventListener('input', (e) => {
    login = e.target.value;
});

document.querySelector('.mail').addEventListener('input', (e) => {
    mail = e.target.value;
});

let login = '';
let mail = '';

document.querySelector('.reg').addEventListener('input', (e) => {
    if(login != '' && mail != '' && password == repeat) {
        document.querySelector('.pass').style.borderBottom = 'solid .2vw rgb(197, 181, 34)';
        document.querySelector('.rep_pass').style.borderBottom = 'solid .2vw rgb(197, 181, 34)';
        document.querySelector('.submit_data').disabled = false;
    } else {
        document.querySelector('.pass').style.borderBottom = 'solid .2vw red';
        document.querySelector('.rep_pass').style.borderBottom = 'solid .2vw red';
        document.querySelector('.submit_data').disabled = true;
    }
})

document.querySelector('.submit_data').addEventListener('click', () => {
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: login,
            password: password,
            mail: mail
        })
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.reg == false) {
            alert('Пользователь с таким именем уже есть')
        } else {
            sessionStorage.setItem('user', JSON.stringify({login: login, mail: mail}));
            window.location.href = "index.html";
        }
      });
})
