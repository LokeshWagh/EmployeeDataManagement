// Install: npm install mongoose-sequence

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  department: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Auto-increment employeeId field, acts as primary key
EmployeeSchema.plugin(AutoIncrement, {inc_field: 'employeeId'});

module.exports = mongoose.model('Employee', EmployeeSchema);
