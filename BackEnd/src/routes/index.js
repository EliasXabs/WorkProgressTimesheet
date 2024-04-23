const express = require('express');
const authRouter = require('./authroutes');
const notificationRouter = require('./notiroutes');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/notification', notificationRouter);

module.exports = {
    notificationRouter,
    apiRouter,
    authRouter
};
