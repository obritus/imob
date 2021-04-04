const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Bairro = new Schema(
	{
		name: { type: String, required: true },
		cidade_id: { type: Schema.Types.ObjectId, ref: "cidades"  }
	},
	{timestamps: true}
)

module.exports = mongoose.model('bairros', Bairro)

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