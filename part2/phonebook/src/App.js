import axios from 'axios';
import { useEffect, useState } from 'react';

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

const Persons = ({ persons }) =>
  persons.map((person) => <SinglePerson person={person} key={person.name} />);

const SinglePerson = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterPersons = (filter) => {
    if (filter) {
      setFilteredPersons(
        persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredPersons(persons);
    }
  };

  const handleChangeFilter = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    filterPersons(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    if (newName) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setFilteredPersons(persons.concat({ name: newName, number: newNumber }));
      setFilter('');
    }
    setNewName('');
    setNewNumber('');
  };

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
