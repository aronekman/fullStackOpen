import { useEffect, useState } from 'react';
import personService from './services/persons';

const Filter = ({ filter, handleChangeFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChangeFilter} />
  </div>
);

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons, handleDelete }) =>
  persons.map((person) => (
    <SinglePerson
      person={person}
      handleDelete={handleDelete}
      key={person.name}
    />
  ));

const SinglePerson = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  );
};

const Notification = ({ message, messageColor }) => {
  if (message === null) {
    return null;
  }

  return <div className={`error ${messageColor}`}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('green');

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleChangeFilter = (event) => setFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...person, number: newNumber };
        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setMessageColor('green');
            setMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessageColor('red');
            setMessage(
              `Information of ${person.name} has alreade been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    if (newName) {
      const person = {
        name: newName,
        number: newNumber,
      };
      personService.add(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessageColor('green');
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    ) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredPersons(
        persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredPersons(persons);
    }
  }, [filter, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageColor={messageColor} />
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
