import React, { useState, useEffect } from "react";
import "./AddressSection.css";
import { API_KEY } from "./config";
import { toast } from "react-toastify";

const AddressSection = (props) => {
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch the list of states
  useEffect(() => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", API_KEY);
    fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Extracting required data from the API response
        const formattedStates = data.map((state) => ({
          id: state.id,
          name: state.name,
          code: state.iso2, // Assuming this is the code you want to use
        }));
        setStates(formattedStates);
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // Fetch the list of cities when the selected state changes
  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", API_KEY);
      // Fetching cities based on the selected state code
      fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState}/cities`,
        {
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
          setLoadingCities(false);
        });
    }
  }, [selectedState]);
  const saveAddress = () => {
    if (
      street === "" ||
      area === "" ||
      selectedCity === "" ||
      selectedState === ""
    ) {
      toast.warning("Please, fill the Address correctly", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log(street, area, selectedCity, selectedState);
      props.addAddress(street, area, selectedCity, selectedState);
      toast.success("Address Saved!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <table className="address-section">
      <tbody>
        <tr>
          <td>
            <label htmlFor="state">Select State:</label>
          </td>
          <td>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state.id} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="city">Select City:</label>
          </td>
          <td>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">-- Select City --</option>
              {loadingCities ? (
                <option disabled className="loading-cities">
                  Loading cities...
                </option>
              ) : (
                cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))
              )}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="street">Address Line 1:</label>
          </td>
          <td>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter street"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="area">Address Line 2:</label>
          </td>
          <td>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area"
            />
          </td>
        </tr>
        <tr>
          <td>
            <button className="button" onClick={saveAddress}>
              Add Address
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AddressSection;
