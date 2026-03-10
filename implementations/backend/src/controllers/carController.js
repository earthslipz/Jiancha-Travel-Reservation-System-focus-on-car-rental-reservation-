const db = require('../database/db');

const getAllCars = async (req, res) => {
  try {
    const { location, type } = req.query;
    let query = 'SELECT * FROM cars WHERE is_available = TRUE';
    const params = [];

    if (location) { query += ' AND location = ?'; params.push(location); }
    if (type) { query += ' AND type = ?'; params.push(type); }

    const [cars] = await db.query(query, params);
    
    // Add discounted_price to each car
    const carsWithDiscount = cars.map(car => ({
      ...car,
      discounted_price: car.is_promotion ? Math.round(car.price_per_day * (1 - car.discount_percent / 100)) : car.price_per_day
    }));
    
    res.json(carsWithDiscount);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const [cars] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (cars.length === 0)
      return res.status(404).json({ message: 'Car not found' });
    res.json(cars[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllCars, getCarById };
