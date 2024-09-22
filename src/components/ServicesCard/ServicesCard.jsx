import { CiClock2 } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "./Services.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../services/helper";

function ServicesCard(props) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [inCart, setInCart] = useState(false);
  const [specsArray, setSpecsArray] = useState([]);

  useEffect(() => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart && cart.serviceId === props.serviceId) {
      setInCart(true);
    }
    let specArr = JSON.parse(props.specifications);
    setSpecsArray([...specArr]);
  }, [props]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      if (cart) {
        if (cart.serviceId === props.serviceId) {
          toast.warning("Service is Already added to the cart", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Only 1 Service can be choosen at a time", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        cart = props;
        toast.success("Service is added to the cart successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.log(cart);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        setInCart(true);
      }
    } else {
      // User is not logged in, redirect to login and set returnUrl
      loginWithRedirect({
        redirectUri: `${BASE_URL}/car-service`,
      });
    }
  };
  return (
    <>
      <div className="container service-container border rounded p-4">
        <div className="row">
          <div className="col-md-2 left-container">
            <img
              src="./Images/basic-service.png"
              alt="basic"
              className="img-fluid"
            />
            <div>
              <span className="original-price text-muted strikethrough">
                Rs.{props.price + 400}
              </span>
              &nbsp;&nbsp;
              {/* Discounted Price */}
              <span className="discounted-price font-weight-bold">
                Rs.{props.price}
              </span>
            </div>
          </div>
          <div className="col-md-8 specification-container border rounded p-4">
            <h2>{props.name}</h2>
            {/* Specifications */}
            <div className="specs-list-container">
              <ul className="list">
                {specsArray.map((specification, index) => (
                  <li key={index}>
                    <IoIosStar /> {specification}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-2 right-container">
            <div className="hours-taken">
              <CiClock2 className="font-size-15"/>
              <span className="font-size-15">{props.duration} hours taken</span>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                className={inCart ? "cartButton" : "button"}
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart ? "Added in the Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesCard;
