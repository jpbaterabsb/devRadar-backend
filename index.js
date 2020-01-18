const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const {setupWebsocket} = require('./websocket');
const app = express();
const server = http.Server(app);

setupWebsocket(server);


mongoose.connect('mongodb+srv://admin:admin@cluster0-im3n5.mongodb.net/week10?retryWrites=true&w=majority',
{
  useUnifiedTopology: true,
  useNewUrlParser: true
});


app.use(cors());
app.use(express.json());


app.use(routes);


server.listen(3333);