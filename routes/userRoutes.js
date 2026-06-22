const express = require('express');
const authControler = require('../controller/authControler');

const usercontrol = require(`${__dirname}/../controller/userControler`);

const Router = express.Router();
Router.post('/signup', authControler.signup);
Router.post('/login', authControler.login);

Router.get(
  '/me',
  authControler.protect,
  usercontrol.getMe,
  usercontrol.getUserbyid,
);
Router.post('/forgotPassword', authControler.forgotPassword);
Router.patch('/resetPassword/:token', authControler.resetPassword);
Router.patch(
  '/updateMypassword',
  authControler.protect,
  authControler.updatePasssword,
);
Router.patch('/updateMe', authControler.protect, usercontrol.updateMe);
Router.delete('/deleteMe', authControler.protect, usercontrol.deleteMe);

Router.route(`/`).get(usercontrol.getUsers).post(usercontrol.createUser);

Router.route(`/:id`)
  .get(usercontrol.getUserbyid)
  .patch(usercontrol.updatedUser)
  .delete(usercontrol.deleteUser);

module.exports = Router;
