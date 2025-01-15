const saveProfile = (req, res) => {
	setTimeout(() => {
		res.json({
			code: 200,
			message: "save successfully"
		})

	}, 2000)
}

exports.saveProfile = saveProfile