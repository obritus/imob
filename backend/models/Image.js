const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema(
	{
		title: { type: String },
		path: { type: String, required: true },
		empreendimento: { type: Schema.Types.ObjectId, ref: "empreendimentos" }
	},
	{timestamps: true}
)

module.exports = mongoose.model('images', Image)

/*

------ TIPOS ------

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map

*/