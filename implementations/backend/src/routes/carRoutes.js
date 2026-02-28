const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'get cars' }));
router.get('/:id', (req, res) => res.json({ message: 'get car by id' }));

module.exports = router;
