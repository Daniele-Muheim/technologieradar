const mongoose = require('mongoose');

const Technologie = mongoose.model(
	"Technologie",
	new mongoose.Schema({
		name: String,
		ring: String,
		category: String,
		status: Boolean,
		description: String,
		descriptionClassification: String,
		creationDate: String,
		publicationDate: String,
		history: [{
			_id: false,
			author: String,
			changeDate: String
		}],
	})
);

module.exports = Technologie
