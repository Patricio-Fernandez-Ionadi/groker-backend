const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
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

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' }
  res.json({ status: states[dbState] || 'unknown', dbReady: dbState === 1 })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
