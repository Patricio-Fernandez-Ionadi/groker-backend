const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// Obtener todos los productos
router.get('/', productController.getProducts)

// Agregar un producto
router.post('/', productController.addProduct)

// Editar un producto
router.put('/:id', productController.editProduct)

// Eliminar un producto
router.delete('/:id', productController.deleteProduct)

module.exports = router
