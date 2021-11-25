const { hasMutation } = require('../helpers/isMutant');

const Mutant = require('./../models/mutation');

const getMutations = async (req, res) => {
	try {
		// Get all documents
		const mutants = await Mutant.find({});
		const isMutants = await Mutant.countDocuments({ isMutant: true });
		const noMutants = await Mutant.countDocuments({ isMutant: false });
		const ratio = isMutants / noMutants;
		const totalRatio = Number(ratio);

		res.status(200).json({
			ok: true,
			mutants,
			count_mutations: isMutants,
			count_no_mutation: noMutants,
			ratio: Number(totalRatio.toFixed(2)),
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'There was an error.',
		});
	}
};

const createMutation = async (req, res) => {
	const { dna } = req.body;

	try {
		if (dna.length === 0) {
			return res.status(403).json({
				ok: true,
				body: {
					msg: 'The dna is empty',
				},
			});
		}

		const mutant = new Mutant(req.body);

		if (!hasMutation(dna)) {
			mutant.isMutant = false;

			await mutant.save();

			return res.status(403).json({
				ok: true,
				body: {
					msg: 'No es mutante',
				},
			});
		}

		await mutant.save();

		return res.status(200).json({
			ok: true,
			body: {
				msg: 'Es mutante',
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'There was an error.',
		});
	}
};

module.exports = {
	getMutations,
	createMutation,
};
