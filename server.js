//Server COnfiguration
const app = require('./app');
const port = 3000;  
const server = http.createServer(app);

server.listen(port, () => console.log(`App running on port ${port}!`))