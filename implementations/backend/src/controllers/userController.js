const db = require('../database/db');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }

    await db.query('UPDATE users SET name = ? WHERE id = ?', [name.trim(), userId]);

    res.json({ message: 'Profile updated successfully', name: name.trim() });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getProfile, updateProfile };
