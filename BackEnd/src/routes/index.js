const express = require('express');
const authRouter = require('./authroutes');
const addRouter = require('./notiroutes');

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/create', addRouter);

module.exports = {
    addRouter,
    apiRouter,
    authRouter
};
