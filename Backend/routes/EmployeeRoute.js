const express = require('express');
const router = express.Router();
const Employee = require('../models/Employes');

// GET /api/employees/positions (for unique positions dropdown)
router.get('/positions', async (req, res) => {
  try {
    const positions = await Employee.distinct('position');
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/employees (supports both search and position filter)
router.get('/', async (req, res) => {
  try {
    const { search, position } = req.query;
    let filter = {};
    const filterConditions = [];

    if (position) {
      filterConditions.push({ position: position });
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filterConditions.push({
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { department: { $regex: searchRegex } },
        ],
      });
    }
    if (filterConditions.length > 0) {
      filter = { $and: filterConditions };
    }

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/employees/addemployee
router.post('/addemployee', async (req, res) => {
  try {
    const { name, email, position, salary, department } = req.body;
    const newEmployee = await Employee.create({
      name,
      email,
      position,
      salary,
      department
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/employees/:id
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/employees/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, email, position, salary, department } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, salary, department },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/employees/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
