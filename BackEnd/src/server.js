const express = require('express');
const databaseConfig = require('./config/database'); 
const initModels = require('./model');
const { apiRouter } = require('./routes');

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.static('public'));

async function startServer() {
    try {
        await databaseConfig.initialize();
        await initModels();

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
