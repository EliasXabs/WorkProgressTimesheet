const express = require('express');
const authRouter = require('./authroutes');
const notificationRouter = require('./notiroutes');
const taskRouter = require('./taskRoute');
const userRouter = require('./userroutes');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/notification', notificationRouter);
apiRouter.use('/task', taskRouter);
apiRouter.use('/user', userRouter);

module.exports = {
    notificationRouter,
    apiRouter,
    authRouter
};
