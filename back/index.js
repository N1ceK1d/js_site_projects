const express = require("express");

const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const multer  = require("multer");
const upload = multer({ dest: 'upload/'});

const path = require('path');
const fs = require('fs');

const crc = require('crc-32');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "testing_db",
    password: ""
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

const type = upload.single('file');


app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>");
});

app.post("/register", (req, res) => {

    const findUser = `SELECT id FROM Users WHERE login = '${req.body.login}'`;
    connection.query(findUser, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            if(result.length == 0) {
                const password = crc.str(req.body.password); 
                const sql = `INSERT INTO Users (login, password, mail) VALUES('${req.body.login}', '${password}', '${req.body.mail}')`;

                connection.query(sql, function(err, results) {
                    if(err){ 
                        console.log(err);
                    } else {
                        console.log("Данные добавлены");
                        res.send({reg: true})
                    }
                });
            } else {
                console.log('Уже есть');
                res.send({reg: true});
            }
        }
    })
    
    
})

app.post("/login", (req, response) => {
    const password = crc.str(req.body.password); 
    const sql = `SELECT login, mail FROM Users WHERE login = '${req.body.login}' AND password = '${password}'`;
    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            response.send(res);
        }
    })
})

function getCurrDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return `${year}.${month + 1}.${day}`;
}

app.post('/createComment',  (req, response) => {
    const date = getCurrDate();
    console.log('start');
    const findUser = `SELECT id FROM Users WHERE login = '${req.body.login}'`;
    connection.query(findUser, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            const userId = res[0].id;
            console.log(userId);
            const sql = `INSERT INTO Comments (user_id, user_comment, comment_date, title) 
            VALUES(${userId}, '${req.body.text}', '${date}', '${req.body.title}')`;

            connection.query(sql, function(err, results) {
                if(err){ 
                    console.log(err);
                } else {
                    console.log(results);
                    console.log('Запись добавлена');
                    console.log('end');
                }
            });
        }
    })
})

app.post("/getComments",  (req, response) => {
    const sql = `SELECT login, user_comment, comment_date, title FROM Comments 
    INNER JOIN Users ON Users.id = Comments.user_id;`;
    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            response.send(res);
        }
    })
})

let work_path;

app.post('/loadWork', type, (req, res) => {
    let filedata = req.file;
    console.log(filedata);
    work_path = filedata.path;
    if(!filedata) {
        res.send("Ошибка при загрузке файла");
    } else {
        res.send("Файл загружен");
    }
    console.log(work_path);
})

app.post('/workData', (req, res) => {
    const findUser = `SELECT id FROM Users WHERE login = '${req.body.login}'`;
    connection.query(findUser, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            const userId = res[0].id;
            const sql = `INSERT INTO Works (user_id, path, title, extensions) 
            VALUES(${userId}, '${work_path}', '${req.body.title}', '${req.body.work_ext}')`;

            connection.query(sql, function(err, results) {
                if(err){ 
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        }
    })
})

app.post('/getWorks', (req, res) => {
    const findUser = `SELECT id FROM Users WHERE login = '${req.body.login}'`;
    connection.query(findUser, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            const userId = results[0].id;
            const sql = `SELECT Works.id, Works.title FROM Works 
            INNER JOIN Users ON Users.id = Works.user_id WHERE Works.user_id = ${userId}`;

            connection.query(sql, function(err, results2) {
                if(err){ 
                    console.log(err);
                } else {
                    console.log(results2);
                    res.send(results2);
                }
            });
        }
    })
})

function getPath(str_path) {
    return str_path.substr( 0, 6 ) + '\\' + str_path.substr(6);
}

app.post('/downloadWork', (req, response) => {
    const sql = `SELECT path, extensions FROM Works WHERE id = ${req.body.work_id};`;
    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(__dirname + '\\' + getPath(res[0].path) );
            response.sendFile(__dirname + '\\' + getPath(res[0].path));
            response.send(res[0].extensions);
        }
    })
})

app.post('/getFileExt', (request, response) => {
    const sql = `SELECT extensions FROM Works WHERE id = ${request.body.work_id};`;
    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            response.send(res);
        }
    })
})

app.listen(3000);