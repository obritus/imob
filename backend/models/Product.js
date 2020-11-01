const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		status: { type: Boolean, required: true },
		details: { type: String },
		images: { type: Array}
	},
	{timestamps: true}
)

module.exports = mongoose.model('products', Product)

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