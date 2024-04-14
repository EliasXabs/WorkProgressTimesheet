const express = require('express');
const authRouter = require('./authroutes');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);

module.exports = {
    apiRouter,
    authRouter
};
