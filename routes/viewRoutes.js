const express = require('express');
const viewControler = require('../controller/viewControler');
const authControler = require('../controller/authControler');

const Router = express.Router();

Router.get('/', authControler.isLoggedIn, viewControler.getOverview);

Router.get('/tour/:slug', authControler.isLoggedIn, viewControler.getTours);

Router.get('/login', authControler.isLoggedIn, viewControler.getLoginForm);

Router.get('/me', authControler.protect, viewControler.getAccount);

module.exports = Router;
