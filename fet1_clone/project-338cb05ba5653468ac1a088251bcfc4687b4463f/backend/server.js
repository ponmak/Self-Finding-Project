const express = require('express')
const server = express()
const PORT = 9999
const bodyParser = require("body-parser")
const expressSession = require('cookie-session')
const router = require('./routes')
const multer = require('multer')
const axios = require('axios');
const { spawn } = require('child_process');

const middle = multer();

server.use(expressSession({
    secret: 'project-admin',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

server.use(require('./configs/middleware'))

server.use(bodyParser.urlencoded({ extended: false, limit: '50MB' }))
server.use(bodyParser.json({ limit: '50MB' }))
server.use('/api', router)

server.post('/api/_swk/process-file', middle.single('file'), async (req, res) => {
    // const fileData = req.file;

    // const pythonProcess = spawn('python', ['./python/fet-2.py', fileData]);
    // const flaskEndpoint = 'http://127.0.0.1:5000/upload';
    // try {
    //     const response = await axios.post(flaskEndpoint, { file: fileData }, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     console.log('Response from Flask server:', response.data);
    //     res.status(200).json(response.data);
    // } catch (error) {
    //     console.error('Error communicating with Flask server:', error.message);
    //     res.status(500).json({ error: 'Error communicating with Flask server' });
    // }
});


server.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

server.get('/api/_swk/start', (req, res) => {
    res.end(`<h1>Server is started</h1>`)
})

server.get('*', (req, res) => {
    res.end(`<h1>Server is started</h1>`)
})

server.listen(PORT, () => console.log('Server is started. APIs http://localhost:' + PORT + '/api/_swk'))