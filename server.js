const express = require('express');
let server = express();

server.use(express.static('web'));
server.listen(process.env.PORT || 3000);