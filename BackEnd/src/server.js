const port = 8080;
const http = require('http');

const server = http.createServer((request, response) => {
    const resObj = {
        status : "success",
        statusCode: "200",
        message : "Hello world"
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(JSON.stringify(resObj));

});

server.listen (port, () => {
    console.log(`Server is running on port ${port}`);
});

