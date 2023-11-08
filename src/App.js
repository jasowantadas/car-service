import { useState } from "react";
import "./App.css";

function App() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [constantNumber, setConstantNumber] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // const fetchData = async (vehicle) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/v1/Cars/${vehicle}`
  //     );
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = (vehicle) => {
    fetch(`http://localhost:8080/api/v1/Cars/${vehicle}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server Error or Vehicle not present in Database!");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      });
  };

  const isAnyFieldEmpty = () => {
    return textValue === "" || numberValue === "";
  };
  return (
    <div className="container">
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        className="text-field-alt"
        placeholder="Enter Vehicle Name "
      />
      <input
        type="text"
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
        className="text-field-alt"
        placeholder="Enter Distance in KM"
      />
      <button
        onClick={() => {
          setConstantNumber(numberValue);
          fetchData(textValue);
        }}
        disabled={isNaN(numberValue) || isAnyFieldEmpty()}
        className={
          isNaN(numberValue) || isAnyFieldEmpty()
            ? "disabled-button primary-button"
            : "primary-button"
        }
      >
        Submit
      </button>

      {data ? (
        data.serviceInterval >= constantNumber ? (
          <h1 style={{ color: "green" }}>
            {data.serviceInterval - constantNumber} days remaining till next
            Servicing
          </h1>
        ) : (
          <h1 style={{ color: "orange" }}>
            {constantNumber - data.serviceInterval} Km's due for servicing
          </h1>
        )
      ) : (
        <h1 style={{ color: "red" }}>{error}</h1>
      )}
    </div>
  );
}

export default App;
