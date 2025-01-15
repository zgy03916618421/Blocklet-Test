const { body } = require('express-validator');

const checkSaveProfile = [
	body('id', 'id is not Empty').notEmpty(),
	body('username', 'username is not Empty').notEmpty(),
	body('email', 'Invaild email').optional().isEmail(),
	body('mobile').optional()
]

exports.checkSaveProfile = checkSaveProfile
