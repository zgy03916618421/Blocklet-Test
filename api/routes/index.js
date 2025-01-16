const router = require('express').Router();
const { getProfileByIdController, saveProfileController } = require('../controller/user-controller');
const { checkSaveProfile } = require('../schema-check');

router.get('/profile/:id', getProfileByIdController);
router.post('/profile/save', checkSaveProfile, saveProfileController);

module.exports = router;
