import { useEffect, useState } from "react";
import ServicesCard from "../ServicesCard/ServicesCard";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { fetchCarServices } from "../../services/Apis";
function CarServices() {
  const [services, setServices] = useState([]);
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
          fetchCarServices().then((response) => {
            setServices((prevServices) => [...prevServices, ...response.data]);
          }).catch ((error) =>  {
            console.error("Error fetching services:", error);
          });
      }
      fetchData();
    }
    if (!isAuthenticated) {
      toast.warn("Please Login first!!!");
    }
  }, [isAuthenticated]);
  return (
    <>
      {services.length > 0 ? (
        services.map((service, index) => (
          <ServicesCard
            key={index}
            serviceId={service.id}
            price={service.price}
            name={service.name}
            specifications={service.specifications}
            duration={service.duration}
          />
        ))
      ) : (
        <p>Please Login First</p>
      )}
    </>
  );
}

export default CarServices;
