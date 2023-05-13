function generateComment(title, text, author, date) {
    const item = ` 
    <div class="comment_item">
        <h1 class="title">${title}</h1>
        <p class="text">${text}</p>
        <p class="author">${author}</p>
        <p class="date">${date}</p>
    </div>`;
    return item;
}

document.querySelector('.send_comment').addEventListener('click', () => {
    let comment_text = document.querySelector('.com_text').value;
    let title = document.querySelector('.com_title').value;
    console.log("Данные отправлены")
    fetch('http://localhost:3000/createComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: JSON.parse(sessionStorage.getItem('user')).login,
            text: comment_text,
            title: title
        })
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
})

getComments();

function getComments() {
    fetch('http://localhost:3000/getComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(response => response.json())
      .then(response => {
        console.log(response);

        response.map(item => {
            document.querySelector('.comment_list').innerHTML += generateComment(item.title, item.user_comment, item.login, item.comment_date);
        })
        
      }); 
}