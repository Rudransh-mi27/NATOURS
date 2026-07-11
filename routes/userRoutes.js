const express = require('express');
const authControler = require('../controller/authControler');

const usercontrol = require(`${__dirname}/../controller/userControler`);

const Router = express.Router();
Router.post('/signup', authControler.signup);
Router.post('/login', authControler.login);
Router.get('/logout', authControler.loggedOut);

Router.post('/forgotPassword', authControler.forgotPassword);
Router.patch('/resetPassword/:token', authControler.resetPassword);

// This Router.use is a mmiddeleware and middeleware always works in sequence so after that middeleware everyone will execute
Router.use(authControler.protect);

Router.get('/me', usercontrol.getMe, usercontrol.getUserbyid);

Router.patch('/updateMypassword', authControler.updatePasssword);
Router.patch('/updateMe', usercontrol.updateMe);
Router.delete('/deleteMe', usercontrol.deleteMe);

Router.use(authControler.restrictTo('admin'));

Router.route(`/`).get(usercontrol.getUsers).post(usercontrol.createUser);

Router.route(`/:id`)
  .get(usercontrol.getUserbyid)
  .patch(usercontrol.updatedUser)
  .delete(usercontrol.deleteUser);

module.exports = Router;
