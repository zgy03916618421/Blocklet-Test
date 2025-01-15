
const { validationResult } = require('express-validator');
const {formatErrMsg} = require('../libs/utils')


const saveProfile = (req, res) => {
	const result = validationResult(req);
	
	if (result.isEmpty()) {
		setTimeout(() => {
			res.json({
				code: 200,
				message: "save successfully"
			})

		}, 2000)

		return
	}

	res.json({
		code: 5001,
		message: formatErrMsg(result.errors)
	})



}

exports.saveProfile = saveProfile