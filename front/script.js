if(sessionStorage.getItem('user')) {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.user_login').textContent = JSON.parse(sessionStorage.getItem('user')).login;
    document.querySelector('.user_mail').textContent = JSON.parse(sessionStorage.getItem('user')).mail;
} else {
    document.querySelector('.user_info').style.display = 'none';
    document.querySelector('.create_comment').style.display = 'none';
    document.querySelector('.works_block').style.display = 'none';
}

document.querySelector('.exit').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.reload();
})