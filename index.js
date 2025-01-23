const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');
const log = console.log;

const app = express();
const server = http.createServer(app);

const ejs = require('ejs');
ejs.delimiter = '?';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> res.render('index'));

const io = socket(server);
io.on('connection', (socket)=>{
    socket.on('send-location', (data)=>{
        io.emit('receive-location', { id: socket.id, ...data})
    })
    socket.on('disconnect', ()=>{
        io.emit('user-disconnected', socket.id)
    })
    // log('connected');
})



server.listen(3000);