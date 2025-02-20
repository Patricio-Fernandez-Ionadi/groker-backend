const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const conectionString = process.env.MONGODB_URI.split('=')[1]

// Set Mongoose strictQuery option
mongoose.set('strictQuery', true)
// MongoDB connection
mongoose
	.connect(conectionString)
	.then(() => console.log('Conectado a MongoDB'))
	.catch((error) => console.error('Error al conectar a MongoDB:', error))
