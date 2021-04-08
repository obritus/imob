const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Empreendimento = new Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		status: { type: Boolean, required: true },
		type: { type: Number },
		cidade: { type: Schema.Types.ObjectId, ref: "cidades" },
		bairro: { type: Schema.Types.ObjectId, ref: "bairros" },
		quartos: { type: Number },
		suites: { type: Number },
		banheiros: { type: Number },
		details: { type: String },
		images: { type: Schema.Types.ObjectId, ref: "images" }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('empreendimentos', Empreendimento)

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