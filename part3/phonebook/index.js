const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
morgan.token('person', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' ';
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
  )
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: 'name missing' });
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.get('/info', (request, response) => {
  const date = new Date();
  const personsAmount = persons.length;
  response.send(`
  <div>Phonebook has info for ${personsAmount} people</div>
  <div>${date}</div>
  `);
});
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) =>
    response.status(204).end()
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
