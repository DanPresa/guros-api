const { Schema, model } = require('mongoose');

const MutationSchema = Schema(
	{
		dna: [{ type: String }],
		isMutant: { type: Boolean, default: true },
	},
	{ collection: 'mutants' }
);

MutationSchema.method('toJSON', function () {
	const { __v, password, ...mutationObj } = this.toObject();

	return mutationObj;
});

module.exports = model('Mutation', MutationSchema);
