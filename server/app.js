const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());
const Employee = mongoose.model('employee');
const mongoUri = // Add your mongodb address here

mongoose.connect(process.env.MONGODB_URI || mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongoose');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});
app.get('/', (req, res) => {
  Employee.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    phone: req.body.phone,
    salary: req.body.salary,
    picture: req.body.picture,
    about: req.body.about,
    github: req.body.github,
    linkedIn: req.body.linkedIn,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/delete', (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/update', (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    phone: req.body.phone,
    salary: req.body.salary,
    picture: req.body.picture,
    github: req.body.github,
    linkedIn: req.body.linkedIn,
    about: req.body.about,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server running');
});
