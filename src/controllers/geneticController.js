const { Genetic } = require('../models/Plants')

// Obtener todas las genéticas
const getGenetics = async (req, res) => {
	try {
		const genetics = await Genetic.find()
		res.status(200).send(genetics)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Agregar una nueva genética
const addGenetic = async (req, res) => {
	try {
		const genetic = new Genetic(req.body)
		await genetic.save()
		res.status(201).send(genetic)
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}

// Editar una genética
const editGenetic = async (req, res) => {
	try {
		const genetic = await Genetic.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!genetic) {
			return res.status(404).send()
		}
		res.send(genetic)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Eliminar una genética
const deleteGenetic = async (req, res) => {
	try {
		const genetic = await Genetic.findByIdAndDelete(req.params.id)
		if (!genetic) {
			return res.status(404).send()
		}
		res.send(genetic)
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports = {
	getGenetics,
	addGenetic,
	editGenetic,
	deleteGenetic,
}
