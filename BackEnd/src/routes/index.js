const express = require('express');
const authRouter = require('./authroutes');
const taskRouter = require('./taskRoute');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/task', taskRouter);
module.exports = {
    apiRouter,
    authRouter
};
