const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
	entryDate: { type: Date, required: true },
	name: { type: String, required: true, unique: true },
	genetic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genetics',
		required: true,
	}, // Referencia a la genética
	stage: {
		type: String,
		enum: ['vegetative', 'flowering', 'germination'],
		default: 'vegetative',
	},
	estimatedChange: { type: Date, required: true }, // Fecha estimada de cambio de etapa
	potSize: { type: Number, default: 0 },
	temperature: { type: Number, default: 0 },
	humidity: { type: Number, default: 0 },
	lastWatered: { type: Date },
	flags: {
		isFinalPot: { type: Boolean, default: false },
		underObservation: { type: Boolean, default: false },
	},
	history: [
		{
			date: { type: Date, required: true },
			events: [
				{
					type: {
						type: String,
						enum: [
							'entryDate',
							'stage',
							'genetic',
							'estimatedChange',
							'watering',
							'potSize',
							'note',
							'isFinalPot',
							'underObservation',
							'temperature',
							'humidity',
							'name',
						],
						required: true,
					},
					details: { type: mongoose.Schema.Types.Mixed },
				},
			],
		},
	],
})

const geneticSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, default: 'Desconocida' },
})

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	stock: { type: Number, required: true },
	nitrogen: { type: Number },
	phosphorus: { type: Number },
	potassium: { type: Number },
	type: { type: String, enum: ['organic', 'mineral'], default: 'organic' },
})

const Plant = mongoose.model('Plants', plantSchema)
const Genetic = mongoose.model('Genetics', geneticSchema)
const Product = mongoose.model('Products', productSchema)

module.exports = { Plant, Genetic, Product }

/* recorrer historial en front
history.map((entry) => {
  switch (entry.type) {
    case "note":
      return <p key={entry.date}>📝 {entry.details}</p>;

    case "stateChange":
      return (
        <p key={entry.date}>
          🌱 Cambio de etapa: {entry.details.previousStage} → {entry.details.newStage}
        </p>
      );

    case "watering":
      return (
        <div key={entry.date}>
          Riego: {entry.details.amount} mL | pH: {entry.details.ph} | EC: {entry.details.ec}
          {entry.details.productsUsed.length > 0 && (
            <ul>
              {entry.details.productsUsed.map((p, index) => (
                <li key={index}>
                  {p.product}: {p.amount} mL
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return <p key={entry.date}>⚠️ Registro desconocido</p>;
  }
})
*/

/* Modelo de datos
const palantModel = {
	entryDate: new Date(),
	name: '',
	genetic: '',
	stage: '',
	estimatedChange: new Date(),
	potSize: '',
	flags: {
		isFinalPot: false,
		underObservation: false,
	},
	history: [],
}
const wateringModel = {
	amount: '',
	date: new Date(),
	productsUsed: [
		{ product: mongoose.Schema.Types.ObjectId, ref: 'Product', amount: '' },
	],
	ph: '',
	ec: '',
}
 */

/* manejar peticiones parciales
de datos al hacer llamadas para evitar traer datos innecesarios

	const plants = await Plant.find()
  .select('entryDate name genetic stage estimatedChange flags history') // Campos que querés traer
  .slice('history', -1) // Solo trae el último registro del historial
  .lean() // Convierte a objetos JS planos para mejor rendimiento
*/
