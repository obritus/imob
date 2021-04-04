const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cidade = new Schema(
	{
		name: { type: String, required: true }
	},
	{timestamps: true}
)

module.exports = mongoose.model('cidades', Cidade)

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