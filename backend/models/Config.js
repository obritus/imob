const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Config = new Schema(
	{
		app_title: { type: String },
		destaques: { type: Object }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('config', Config)