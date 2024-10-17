import { useState, useEffect } from "react";
import "./App.css";

// API: https://ctp-zip-code-api.onrender.com/

function City({ cityData }) {
  return (
    <div>
      <div>
        <p>{cityData.LocationText}</p>
      </div>
      <div>
        <ul>
          <li>State: {cityData.State}</li>
          <li>
            Location: ({cityData.Lat}, {cityData.Long})
          </li>
          <li>Population (estimated): {cityData.EstimatedPopulation}</li>
          <li>Total Wages: {cityData.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField() {
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState("");

  const handleInputChange = (event) => {
    const newZipCode = event.target.value;
    setZipCode(newZipCode);
  };

  useEffect(() => {
    fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [zipCode]);

  return (
    <div>
      <form>
        <input
          type="text"
          value={zipCode}
          onChange={handleInputChange}
          placeholder="Enter zip code"
        />
      </form>
      {data.map((cityInfo, index) => (
        <City key={index} cityData={cityInfo} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <p>Zip Code: </p>
        <ZipSearchField />
      </div>
    </div>
  );
}

export default App;
