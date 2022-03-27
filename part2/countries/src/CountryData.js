const Country = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>{`capital ${country.capital[0]}`}</div>
    <div>{`area ${country.area}`}</div>
    <h4>languages:</h4>
    <ul>
      {Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}
    </ul>
    <img src={country.flags.svg} alt={'flag'} width={200} />
  </div>
);

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
