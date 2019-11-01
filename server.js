const express = require('express')
const router = require('./posts-router')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())

server.use('/api/posts', router);

server.get('/', (req, res) => {
    res.send(`
      HELLO THERE
    `);
  });

module.exports = server;