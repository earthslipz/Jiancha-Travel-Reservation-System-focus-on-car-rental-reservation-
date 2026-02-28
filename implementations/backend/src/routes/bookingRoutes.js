const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'get bookings' }));
router.post('/', (req, res) => res.json({ message: 'create booking' }));

module.exports = router;
