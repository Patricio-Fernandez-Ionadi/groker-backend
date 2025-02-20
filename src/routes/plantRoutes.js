const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plantController')

// Obtener todas las plantas
router.get('/', plantController.getPlants)

// Agregar una nueva planta
router.post('/', plantController.addPlant)

// Editar una planta
router.put('/:id', plantController.editPlant)

// Eliminar una planta
router.delete('/:id', plantController.deletePlant)

// SIN USO
// Añadir un registro al historial de una planta
router.post('/:id/history', plantController.addHistory)

// Modificar un registro del historial de una planta
router.put('/:id/history/:historyId', plantController.editHistory)

// Eliminar un registro del historial de una planta
router.delete('/:id/history/:historyId', plantController.deleteHistory)

module.exports = router
