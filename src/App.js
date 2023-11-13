import { useState } from "react";
import "./App.css";

function App() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  //const [constantNumber, setConstantNumber] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //const [postData, setPostData] = useState({ name: "", serviceInterval: "" });

  // const fetchData = (vehicle) => {
  // //   fetch(`http://localhost:8080/api/v1/Cars/${vehicle}`)
  // //     .then((response) => {
  // //       if (!response.ok) {
  // //         throw new Error("Vehicle not present in Database!");
  // //       }
  // //       return response.json();
  // //     })
  // //     .then((data) => {
  // //       setData(data);
  // //       setError(null);
  // //     })
  // //     .catch((error) => {
  // //       setError(error.message);
  // //       setData(null);
  // //     });
  // // };
  const fetchInterval = (vehicle, interval) => {
    fetch(
      `https://car-services.azurewebsites.net/api/v1/Cars/${vehicle}/${interval}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Vehicle not present in Database!");
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
  const postCar = (d) => {
    fetch(`https://car-services.azurewebsites.net/api/v1/Cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
      credentials: "omit",
    })
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Failed to add car. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((dataa) => {
        alert("Car Added to Database");
        console.log("Success", dataa);
      })
      .catch((error) => {
        alert(`Error adding car: ${error.message}`);
        console.error("Error", error);
      });

    // .then((response) => {
    //   return response.json();
    // })
    // .then((dataa) => {
    //   // if (!dataa.success) {
    //   //   throw new Error("No Add new Car!");
    //   // }
    //   alert("Car Added ot Database");
    //   console.log("Sucess");
    // })
    // .catch((er) => {
    //   alert("Couldnt add Car!");
    //   console.log("Not Sucess");
    // });
  };
  const delCar = (d) => {
    fetch(`https://car-services.azurewebsites.net/api/v1/Cars?name=${d}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Failed to delete car. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((dataa) => {
        alert("Car Deleted!");
        console.log("Success", dataa);
      })
      .catch((error) => {
        alert(`Error deleting car: ${error.message}`);
        console.error("Error", error);
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
          //setConstantNumber(numberValue);
          fetchInterval(textValue, numberValue);
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
      <button
        onClick={() => {
          //setConstantNumber(numberValue);
          postCar({ name: textValue, serviceInterval: numberValue });
        }}
        disabled={isNaN(numberValue) || isAnyFieldEmpty()}
        className={
          isNaN(numberValue) || isAnyFieldEmpty()
            ? "disabled-button primary-button"
            : "primary-button2"
        }
      >
        Add new Car
      </button>
      <button
        onClick={() => {
          //setConstantNumber(numberValue);
          delCar(textValue);
        }}
        disabled={textValue === ""}
        className={
          textValue === ""
            ? "disabled-button primary-button"
            : "secondary-button"
        }
      >
        Delete a car
      </button>

      {/* {data ? (
        data.serviceInterval >= constantNumber ? (
          <h1 style={{ color: "green" }}>
            {(data.serviceInterval - constantNumber).toFixed(2)} Km's remaining
            till next Servicing
          </h1>
        ) : (
          <h1 style={{ color: "orange" }}>
            {(constantNumber - data.serviceInterval).toFixed(2)} Km's due for
            servicing
          </h1>
        )
      ) : (
        <h1 style={{ color: "red" }}>{error}</h1>
      )} */}
      {console.log(data)}
      {data ? (
        data >= 0 ? (
          <h1 style={{ color: "green" }}>
            {data.toFixed(2)} Km's remaining till next Servicing
          </h1>
        ) : (
          <h1 style={{ color: "orange" }}>
            {-data.toFixed(2)} Km's due for servicing
          </h1>
        )
      ) : data === 0 ? (
        <h1 style={{ color: "green" }}>0 Km's remaining till next Servicing</h1>
      ) : (
        <h1 style={{ color: "red" }}>{error}</h1>
      )}
    </div>
  );
}

export default App;
