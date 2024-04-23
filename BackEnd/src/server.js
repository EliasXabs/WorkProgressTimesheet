const express = require('express');
const databaseConfig = require('./config/database'); 

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.static('public'));

let models;

async function startServer() {
    try {
        console.log('Initializing database...');
        await databaseConfig.initialize();
        console.log('Database initialized.');

        const initModels = require('./model');
        
        console.log('Initializing models...');
        models = await initModels();
        console.log('Models initialized.');

        const { apiRouter } = require('./routes');

        app.use('/api', apiRouter);

        app.get('/', (req, res) => {
            res.json({ message: "Welcome to our application!" });
        });

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to initialize models or server:', err);
    }
}

startServer();

module.exports = {getModels : () => models}
