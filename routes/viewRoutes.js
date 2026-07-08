const express = require('express');
const viewControler = require('../controller/viewControler');
const authControler = require('../controller/authControler');

const Router = express.Router();

Router.get('/', viewControler.getOverview);

Router.get('/tour/:slug', authControler.protect, viewControler.getTours);

Router.get('/login', viewControler.getLoginForm);

module.exports = Router;
