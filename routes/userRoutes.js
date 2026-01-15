const express = require('express');
const usercontrol=require(`${__dirname}/../controller/userControler`)
const Router=express.Router();
Router.route(`/`).get(usercontrol.getUsers).post(usercontrol.createUser);

Router
  .route(`/:x`)
  .get(usercontrol.getUserbyid)
  .patch(usercontrol.updatedUser)
  .delete(usercontrol.deleteUser);

  module.exports=Router;