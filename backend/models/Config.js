const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Config = new Schema(
	{
		site_title: { type: String },
		carousel: { type: Object },
		default_banner: { type: Schema.Types.ObjectId, ref: "empreendimentos" },
		destaques: [{ type: Schema.Types.ObjectId, ref: "empreendimentos" }],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('config', Config)