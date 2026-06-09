const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
	entryDate: { type: Date, required: true },
	name: { type: String, required: true, unique: true },
	genetic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genetics',
		required: true,
	},
	stage: {
		type: String,
		enum: ['vegetative', 'flowering', 'germination'],
		default: 'vegetative',
	},
	estimatedChange: { type: Date, required: true },
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

const Plant = mongoose.model('Plants', plantSchema)

module.exports = Plant
