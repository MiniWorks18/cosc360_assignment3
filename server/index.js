// Main (index) file for the server-side API program
// Purpose: Take API requests from clients and store data 
// into the database

const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD, PORT } = require("./config/config");
const app = express();

const chatty = require('./services/status')
const WebSocketServer = require('websocket').server

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerOptions = require('./config/swagger')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

let wsClients = []

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Connect to mongo database 
const mongoDbUrl =
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;
console.log(mongoDbUrl)
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true, useUnifiedTopology:
    true
})
  .then(() => console.log('Database Connected'))
  .catch(err => console.error(err));
mongoose.set('useFindAndModify', false)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

var corsOptions = {
  "methods": "GET,POST,DELETE,PUT",
  "origin": "*"
}

const server = app.listen(PORT, () => console.log(`Express is listening
on port ${PORT}!`))

app.use(cors(corsOptions));
// Helps provide confirmation of connection, remove later
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})



// app.listen(PORT, () => console.log(`Express is listening on port ${PORT}!`))

const reservationRouter = require('./routes/reservation');
app.use('/reservations', reservationRouter);

// error handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.send(err);
})

wsServer.on('request', (req) => {
  const pathname = req.resourceURL.pathname
  const connection = req.accept(null, req.origin)
  // We only accept connection from allowed origins
  if (!chatty.originIsAllowed(req.origin)) {
    req.reject();
    return;
  }

  // We only accept connection from allowed path
  if (!chatty.pathnameIsAllowed(pathname, req.origin)) {
    req.reject();
    return;
  }

  // Assign user ID to client and keep track of active connections
  wsClients = chatty.assignUser(wsClients, connection, req.origin)

  // Handle incoming messages
  connection.on('message', (message) =>
    chatty.incomingMessageHandler(message, wsClients))
  // Handle disconnection - remove disconnected client
  connection.on('close', (connection) => {
    console.log((new Date()) + " User " + userId + " disconnected.")
    delete wsClients[userId]
  })
})

// Setup redirect documentation requests to swagger
const openApiSpecification = swaggerJSDoc(swaggerOptions.options)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification))

const restaurants = [
  {
    title: "Boost",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. \
    Mi bibendum neque egestas congue. Lectus quam id leo in vitae turpis massa.",
    img: "boost.jpg",
    id: 1,
    dates:
      [["2021-09-14", ["12:30 PM", "8:30 PM", "9:00 PM"]]]

  },
  {
    title: "McDonalds",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
    tempor incididunt ut labore et dolore magna aliqua. Nullam non nisi est sit amet \
    facilisis. Elit duis tristique sollicitudin nibh. Lobortis elementum nibh tellus \
    molestie nunc non blandit massa enim.",
    img: "mcdonalds.png",
    id: 2,
    dates:
      [["2021-09-11", ["12:30 PM", "8:30 PM", "9:00 PM"]],
      ["2021-09-12", ["12:30 PM", "8:30 PM", "9:00 PM"]],
      ["2021-09-13", ["12:30 PM", "8:30 PM", "9:00 PM"]]],
  }
]


app.get('/restaurants',
  (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.json(restaurants)
  }
)
