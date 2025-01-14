const middlewares = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const userController = require('../controller/user-controller')

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.post('/profile/save', userController.saveProfile)

module.exports = router;
