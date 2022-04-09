const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('person', function (req) {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :person'
    )
)

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => response.json(persons))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((error) => next(error))
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then((persons) => {
        response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${date}</div>
    `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, contex: 'query' }
    )
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
