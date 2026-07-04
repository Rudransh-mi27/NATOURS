const express = require('express');
const viewControler = require('../controller/viewControler');

const Router = express.Router();

Router.get('/', viewControler.getOverview);

Router.get('/tour', viewControler.getTours);

module.exports = Router;
