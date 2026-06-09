const mongoose = require('mongoose')

const geneticSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, default: 'Desconocida' },
})

const Genetic = mongoose.model('Genetics', geneticSchema)

module.exports = Genetic
