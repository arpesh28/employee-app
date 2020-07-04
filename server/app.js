const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());
const Employee = mongoose.model('employee');
const mongoUri =
  'mongodb://arpesh:arpesh1234@cluster0-shard-00-00.vklxf.mongodb.net:27017,cluster0-shard-00-01.vklxf.mongodb.net:27017,cluster0-shard-00-02.vklxf.mongodb.net:27017/employee?ssl=true&replicaSet=atlas-4zwk9r-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
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
  res.send('Welcome to Nodejs');
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    phone: req.body.phone,
    salary: req.body.salary,
    picture: req.body.picture,
    github: req.body.github,
    linkedIn: req.body.linkedIn,
    about: req.body.about,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send('success');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/delete', (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
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
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server running');
});
