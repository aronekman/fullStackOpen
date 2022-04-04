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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
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
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name) {
    return response.status(400).json({ error: 'name missing' });
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' });
  }
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' });
  }
  const person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
