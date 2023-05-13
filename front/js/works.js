let work_title;
console.log($('.work_title_in'));
$('.work_title_in').change((e) => {
	work_title = e.target.value;
})

function ext(filename) {
	return filename.match(/\.([^.]+)$|$/)[1];
}

$(".load_work").click(function(){
	if (window.FormData === undefined) {
		alert('В вашем браузере FormData не поддерживается')
	} else {
		var formData = new FormData();
		formData.append('file', $("#work_file")[0].files[0]);
		console.log($("#work_file")[0].files[0]);
		const exten = ext($("#work_file")[0].files[0].name);
		console.log(exten);
		$.ajax({
			type: "POST",
			url: 'http://localhost:3000/loadWork',
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			dataType : 'json',
			success: function(msg){
				if (msg.error == '') {
					console.log(msg.success);
				} else {
					console.log(msg.error);
				}
			}
		});
		
        setTimeout(async () => {
            fetch('http://localhost:3000/workData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({ login: JSON.parse(sessionStorage.getItem('user')).login,
				title: work_title,
				work_ext: exten })
            })
        }, 100)

		setTimeout(()=> {
			window.location.reload();
		}, 200);
	}
});

fetch('http://localhost:3000/getWorks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({ login: JSON.parse(sessionStorage.getItem('user')).login })
}).then(response => response.json())
.then(result => {
	result.map(item => {
		$(".works_list").append(createWorkItem(item.id, item.title));
	})
})

function createWorkItem(id, title) {
    const item = `<div class="work_item">
		<img class="file_icon" src="images/file.png" alt="">
		<div>
			<p class="work_title">${title}</p>
			<button id="${id}" class="load_work">Загрузить</button>
		</div>
	</div>`;
	return item;
}

$('.works_list').click(e => {
	if(e.target.classList.contains("load_work")) {
		console.log(e.target.id);
		fetch('http://localhost:3000/downloadWork', {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({work_id: e.target.id})
		}).then(response => response.blob())
		.then(blob  => {
			let ex ;
			
			fetch('http://localhost:3000/getFileExt', {
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({work_id: e.target.id})
			}).then(resp => resp.json())
			.then(res => {
				console.log(res[0].extensions);
				ex = res[0].extensions;
			})

			setTimeout(() => {
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				console.log(ex);
				a.download = `project.${ex}`;
				document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
				a.click();    
				a.remove();
			}, 100)
			
		});
	}
})