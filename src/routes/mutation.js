const { Router } = require('express');

const { createMutation, getMutations } = require('../controllers/mutation');

const router = Router();

router.get('/stats', getMutations);
router.post('/mutation', createMutation);

module.exports = router;
