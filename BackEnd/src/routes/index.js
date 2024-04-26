const express = require('express');
const authRouter = require('./authroutes');
const notificationRouter = require('./notiroutes');
const taskRouter = require('./taskRoute');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/notification', notificationRouter);
apiRouter.use('/task', taskRouter);
module.exports = {
    notificationRouter,
    apiRouter,
    authRouter
};
