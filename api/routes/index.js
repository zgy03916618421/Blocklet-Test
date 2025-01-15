const middlewares = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const userController = require('../controller/user-controller')
const {checkSaveProfile} = require('../schema-check')

router.post('/profile/save',checkSaveProfile,userController.saveProfile)

module.exports = router;
