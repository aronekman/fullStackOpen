import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ weatherData }) => {
  if (weatherData) {
    return (
      <>
        <div>temperature {weatherData.main.temp} Celcius</div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="weatherIcon"
        />
        <div>wind {weatherData.wind.speed} m/s</div>
      </>
    );
  }
  return null;
};
const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => setWeatherData(response.data));
  }, [country.capital, country.cca2]);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={'flag'} width={200} />
      <h3>Weather in {country.capital[0]}</h3>
      <Weather weatherData={weatherData} />
    </div>
  );
};

const CountryData = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <>
        {countries.map((country) => (
          <div key={country.fifa}>
            {country.name.common}
            <button onClick={() => setCountries([country])}>show</button>
          </div>
        ))}
      </>
    );
  }
};

export default CountryData;
