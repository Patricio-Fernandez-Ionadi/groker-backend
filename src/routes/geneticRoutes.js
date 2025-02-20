const express = require('express')
const router = express.Router()
const geneticController = require('../controllers/geneticController')

// Obtener todas las genéticas
router.get('/', geneticController.getGenetics)

// Agregar una nueva genética
router.post('/', geneticController.addGenetic)

// Editar una genética
router.put('/:id', geneticController.editGenetic)

// Eliminar una genética
router.delete('/:id', geneticController.deleteGenetic)

module.exports = router
