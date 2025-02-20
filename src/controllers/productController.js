const { Product } = require('../models/Plants')

// Obtener todos los productos
const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.send(products)
	} catch (error) {
		res.status(500).send(error)
	}
}

// Agregar un producto
const addProduct = async (req, res) => {
	try {
		const { name, stock, nitrogen, potassium, phosphorus, type } = req.body

		const product = new Product({
			name,
			stock: Number(stock),
			nitrogen,
			potassium,
			phosphorus,
			type,
		})
		// Guardar el producto en la base de datos
		const savedProduct = await product.save()

		res.status(201).json(savedProduct)
	} catch (error) {
		res.status(400).json(error)
	}
}

// Editar un producto
const editProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!product) {
			return res.status(404).send()
		}
		res.send(product)
	} catch (error) {
		res.status(400).send(error)
	}
}

// Eliminar un producto
const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) {
			return res.status(404).send()
		}
		res.send(product)
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports = {
	getProducts,
	addProduct,
	editProduct,
	deleteProduct,
}
