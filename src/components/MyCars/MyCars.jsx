import React, { useEffect, useState } from "react";
import "./MyCars.css";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
const MyCars = () => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const { isAuthenticated } = useAuth0();
  const carsData = [
    {
      imageUrl: "./Images/Mahindra_Thar.jpg",
      modelName: "Mahindra Thar",
      registrationNumber: "MH20-5265",
      year: 2022,
      kilometers: 40000,
    },
    {
      imageUrl: "./Images/Maruti_Suzuki_FRONX.jpg",
      modelName: "Maruti Suzuki FRONX",
      registrationNumber: "MH20-5264",
      year: 2023,
      kilometers: 50000,
    },
    // Add more cars as needed
  ];

  const selectedCar = carsData[selectedCarIndex];

  const handlePrevCar = () => {
    setSelectedCarIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : carsData.length - 1
    );
  };

  const handleNextCar = () => {
    setSelectedCarIndex((prevIndex) =>
      prevIndex < carsData.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleSave = () => {
    console.log("Save button clicked");

    window.location.href = "/";
  };
  useEffect(() => {
    if (!isAuthenticated) toast.warn("please login first");
  });
  return (
    <>
      {isAuthenticated ? (
        <div className="my-cars-container">
          <h2>My Cars</h2>
          <div className="car-details">
            <img
              src={`${process.env.PUBLIC_URL}${selectedCar.imageUrl}`}
              alt={`Car ${selectedCarIndex + 1}`}
            />
            <div className="car-info">
              <p>
                <b>Model Name:</b> {selectedCar.modelName}
              </p>
              <p>
                <b>Registration Number:</b> {selectedCar.registrationNumber}
              </p>
              <p>
                <b>Year:</b> {selectedCar.year}
              </p>
              <p>
                <b>Kilometers:</b> {selectedCar.kilometers}
              </p>
            </div>
          </div>
          <div className="navigation-buttons">
            <button className="prev" onClick={handlePrevCar}>
              &lt;Previous
            </button>
            <button className="next" onClick={handleNextCar}>
              Next&gt;
            </button>
          </div>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MyCars;
