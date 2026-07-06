const express = require('express');
const viewControler = require('../controller/viewControler');

const Router = express.Router();

Router.get('/', viewControler.getOverview);

Router.get('/tour/:slug', viewControler.getTours);

module.exports = Router;
