import React, { useState, useEffect } from 'react';

function CityName() {
  const [city, setCity] = useState('City');

  useEffect(() => {
    // Function to get the city name
    function getCityName() {
      // Check if geolocation is supported
      if ("geolocation" in navigator) {
        // Get current position
        navigator.geolocation.getCurrentPosition((position) => {
          // Retrieve latitude and longitude
          const { latitude, longitude } = position.coords;

          // Use reverse geocoding to get city name
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              // Extract and set city name
              const cityName = data.city;
              setCity(cityName);
            })
            .catch(error => console.error('Error:', error));
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    // Call the function to get city name when the component mounts
    getCityName();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    
      <b>{city}</b>
    
  );
}

export default CityName;
