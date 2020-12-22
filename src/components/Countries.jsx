import React, { useEffect, useState } from "react";

const mapvalues = (text, value) => {
  if (value.name.toLowerCase().startsWith(text.toLowerCase())) {
    return true;
  }
  return false;
};

const searchFilter = (text, list) => {
  if (text === "") return list;

  return list.filter((value) => mapvalues(text, value));
};

const CountryCard = ({ country }) => {
  return (
    <div className="col-6">
      <div className="card bg-primary mb-4 text-white" style={{ width: "18rem", height: "32rem" }}>
              <img className="card-img-top" src={country.flag} alt="Card image cap" />
        <div className="card-body">
          <h1>{country.name}</h1>
          <h6>CAPITAL : {country.capital}</h6>
          <h6>REGION : {country.region}</h6>
          <h6>POPULATION : {country.population}</h6>
        </div>
      </div>
    </div>
  );
};

const SearchCom = ({ text, handleChange }) => {
  return (
    <div>
      <label className="mr-3" for="search" style={{ color: "white" }}>
        {" "}
        Search{" "}
      </label>
      <input
        type="text"
        id="search"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

const Loading = () => {
  useEffect(() => {
    return () => {
      console.log("Oops !!!");
    };
  });
  return <h1>Loading !!!</h1>;
};

const Countries = (props) => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
const [searchKey, setSearchKey] = useState("");


  useEffect(() => {
    console.log("Component Did Mount :::: App");
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((country) => {
        setCountries(country);
        setLoading(false);
      });
  }, []);
  
  
  return (
    <div className="container mt-5">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <SearchCom text={searchKey} handleChange={setSearchKey} />
          <div className="row mt-5">
            {searchFilter(searchKey, countries).map((country, index) => (
              <div key={index}>
                <CountryCard country={country} />
              </div>
            ))}
          </div>
        </div>
              )}
          
    </div>
  );
};

export default Countries;
