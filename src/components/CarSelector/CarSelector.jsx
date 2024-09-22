import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarSelector.css";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const CarSelectionPage = () => {
  // Sample data for car models, years, and fuel types
  const carModels = ["Toyota", "Honda", "Ford", "BMW"];
  const years = ["2022", "2021", "2020", "2019", "2018"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const { isAuthenticated } = useAuth0();
  // State variables to store selected values
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");

  // Access the navigate function for navigation
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Assuming validation passes, navigate to "/car-service"
    if (
      selectedFuelType === "" ||
      selectedYear === "" ||
      selectedModel === ""
    ) {
      toast.warn("Please fill all the fields!!");
    } else {
      let vehicle = {
        manufacturer: selectedModel,
        yearOfManufacturer: selectedYear,
        fuelType: selectedFuelType,
      };

      localStorage.setItem("vehicle", JSON.stringify(vehicle));
      navigate("/car-service");
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please Login first!!!");
    }
  }, [isAuthenticated]);
  return (
    <>
      {isAuthenticated ? (
        <div className="container car-selector-container">
          <h2>Select Your Car</h2>
          <div className="row">
            <div className="col-md-3">
              <label>Car Model:</label>
            </div>
            <div className="col-md-9">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">Select Model</option>
                {carModels.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label>Year of Manufacture:</label>
            </div>
            <div className="col-md-9">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label>Fuel Type:</label>
            </div>
            <div className="col-md-9">
              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
              >
                <option value="">Select Fuel Type</option>
                {fuelTypes.map((fuelType, index) => (
                  <option key={index} value={fuelType}>
                    {fuelType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                className="button"
                // disabled={!selectedModel || !selectedYear || !selectedFuelType}
                onClick={handleSubmit}
              >
                Proceed to Car Service
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please login First</p>
      )}
    </>
  );
};

export default CarSelectionPage;
