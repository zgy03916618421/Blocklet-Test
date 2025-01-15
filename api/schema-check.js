const { body } = require('express-validator');

const checkSaveProfile = [
	body('username', 'username is not Empty').notEmpty(),
	
	body('email', 'Invaild email').optional().isEmail(),

	body('age', 'age is not empty').notEmpty(),
	body('sex', 'age is not empty').notEmpty()
]

exports.checkSaveProfile = checkSaveProfile
