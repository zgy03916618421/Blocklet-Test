const {knex} = require('../database/connection')
const getProfileById =  (id) => {
	return knex('users').select().where('id', id).first()
}

const saveProfile =  (profile) => {
	return knex('users').update(profile).where('id', profile.id)

}

module.exports = {
	getProfileById,
	saveProfile,
}