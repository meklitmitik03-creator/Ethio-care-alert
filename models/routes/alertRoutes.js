const express = require('express');
const router = express.Router();
const Alert = require('../Alert');

// 1. GET - Fetch all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET - Fetch single alert by ID
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST - Create a new alert
router.post('/', async (req, res) => {
  try {
    const { title, description, severity, location } = req.body;
    const newAlert = new Alert({ title, description, severity, location });
    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. PUT - Update an existing alert (e.g., change status)
router.put('/:id', async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAlert) return res.status(404).json({ error: 'Alert not found' });
    res.json(updatedAlert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE - Delete an alert
router.delete('/:id', async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
    if (!deletedAlert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ message: 'Alert deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;