const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema(
	{
		nome: { type: String, required: true },
		email: { type: String, required: true },
		senha: { type: String, required: true },
		status: { type: Boolean, required: true },
		admin: { type: Boolean, required: true }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('usuarios', Usuario)