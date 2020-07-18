const express = require("express");
const helmet = require("helmet");
const projects = require("./routes/projectsRoutes");

const server = express();
server.use(express.json());
server.use(helmet());

server.get('/', (req,res) =>{
    res.send(`
    <h1>My first web api sprint challenge</h1>
    `)
});

server.use("/api/projects", projects);

module.exports = server;