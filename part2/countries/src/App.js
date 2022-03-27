import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryData from './CountryData';

const Search = ({ value, onChange }) => (
  <div>
    find countries <input value={value} onChange={onChange} />
  </div>
);

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountryData(response.data));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value) {
      setFilteredList(
        countryData.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredList([]);
    }
  };

  return (
    <div>
      <Search value={searchValue} onChange={handleSearch} />
      <CountryData countries={filteredList} />
    </div>
  );
};

export default App;
