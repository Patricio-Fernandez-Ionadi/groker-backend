const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	stock: { type: Number, required: true },
	nitrogen: { type: Number },
	phosphorus: { type: Number },
	potassium: { type: Number },
	type: { type: String, enum: ['organic', 'mineral'], default: 'organic' },
})

const Product = mongoose.model('Products', productSchema)

module.exports = Product
