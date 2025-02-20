const { Plant } = require('../models/Plants')

// Obtener todas las plantas
const getPlants = async (req, res) => {
	try {
		const plants = await Plant.find().populate('genetic')
		res.status(200).send(plants)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Agregar una nueva planta
const addPlant = async (req, res) => {
	try {
		const plant = new Plant(req.body)
		await plant.save()
		res.status(201).send(plant)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Editar una planta
const editPlant = async (req, res) => {
	try {
		const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!plant) {
			return res.status(404).send()
		}
		res.send(plant)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Eliminar una planta
const deletePlant = async (req, res) => {
	try {
		const plant = await Plant.findByIdAndDelete(req.params.id)
		if (!plant) {
			return res.status(404).send()
		}
		res.send(plant)
	} catch (error) {
		res.status(500).send(error)
	}
}

// SIN USO
// Añadir un registro al historial de una planta
const addHistory = async (req, res) => {
	try {
		const plant = await Plant.findById(req.params.id)
		if (!plant) {
			return res.status(404).send()
		}
		plant.history.push(req.body)
		await plant.save()
		res.status(201).send(plant)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Modificar un registro del historial de una planta
const editHistory = async (req, res) => {
	try {
		const plant = await Plant.findById(req.params.id)
		if (!plant) {
			return res.status(404).send()
		}
		const history = plant.history.id(req.params.historyId)
		if (!history) {
			return res.status(404).send()
		}
		Object.assign(history, req.body)
		await plant.save()
		res.send(plant)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Eliminar un registro del historial de una planta
const deleteHistory = async (req, res) => {
	try {
		const plant = await Plant.findById(req.params.id)
		if (!plant) {
			return res.status(404).send()
		}
		const history = plant.history.id(req.params.historyId)
		if (!history) {
			return res.status(404).send()
		}
		history.remove()
		await plant.save()
		res.send(plant)
	} catch (error) {
		res.status(400).send(error)
	}
}

module.exports = {
	getPlants,
	addPlant,
	editPlant,
	deletePlant,
	addHistory,
	editHistory,
	deleteHistory,
}
