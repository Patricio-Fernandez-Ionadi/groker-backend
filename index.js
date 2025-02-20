const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())

// Conectar a MongoDB
require('./src/db/mongoose')

// Routes
const plantRoutes = require('./src/routes/plantRoutes')
const productRoutes = require('./src/routes/productRoutes')
const geneticRoutes = require('./src/routes/geneticRoutes')
app.use('/api/plants', plantRoutes)
app.use('/api/products', productRoutes)
app.use('/api/genetics', geneticRoutes)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

// Start server
app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`)
})
