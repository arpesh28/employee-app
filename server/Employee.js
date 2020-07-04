const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  phone: String,
  picture: String,
  salary: String,
  github: String,
  linkedIn: String,
  about: String,
});

mongoose.model('employee', EmployeeSchema);
