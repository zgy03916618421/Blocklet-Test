
const { validationResult, matchedData } = require('express-validator');
const { formatErrMsg } = require('../libs/utils')
const { getProfileById, saveProfile } = require('../service/user-service')
const logger = require('../libs/logger')

const ERROR = {
	InternalErr: 'Internal server error'
}

const getProfileByIdController = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await getProfileById(id)
		res.json({
			code: 200,
			data,

		})
	} catch (err) {
		res.json({
			code: 5001,
			message: err.toString(),
		})
		// use logger which is compatible with log system(if we introduce a log system, we can easily hanle this)
		logger.error(err)

	}


}

const saveProfileController = async (req, res) => {
	const result = validationResult(req);
	// drop all extra fields from request and keep checked fields.
	const profile = matchedData(req)
	if (result.isEmpty()) {
		try {
			await saveProfile(profile)
			res.json({
				code: 200,
				message: 'Save successfully!'
			})
		} catch (err) {
			res.json({
				code: 5001,
				message: ERROR.InternalErr,
			})
			// use logger which is compatible with log system(if we introduce a log system, we can easily hanle this)
			logger.error(err)

		}
		return
	}

	res.json({
		code: 5001,
		message: formatErrMsg(result.errors)
	})
}
module.exports = {
	getProfileByIdController,
	saveProfileController,
}
