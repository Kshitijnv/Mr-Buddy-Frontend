import React, { useEffect, useState } from "react";
import "./Checkout.css";
import AddressSection from "../Address/AddressSection";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";
import { createNewOrder } from "../../services/Apis";
function Cart() {
  const [cartdata, setCartdata] = useState([]);
  const { user } = useAuth0();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isOrderReady, setIsOrderReady] = useState(false);
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isAddressReady, setIsAddressReady] = useState(false);
  const navigate = useNavigate();
  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  useEffect(() => {
    const validateOrder = () => {
      const isReady = selectedDate && selectedTimeSlot && isAddressReady;
      setIsOrderReady(isReady);
    };
    validateOrder();
  }, [selectedDate, selectedTimeSlot, isAddressReady]);

  // Access the service price from the location state
  const servicePrice = cartdata.price + 99;
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const createOrder = async () => {
    if (isOrderReady) {
      // Perform actions when the "Place an Order" button is clicked
      // You can use the userAddress, selectedDate, selectedTimeSlot, etc.
      console.log("button clicked");

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      let paymentRes = {
        username: user.sub,
        pickUpDate: JSON.stringify(selectedDate),
        pickUpTime: JSON.stringify(selectedTimeSlot),
        amount: servicePrice,
        address: {
          adrLine1: street,
          adrLine2: area,
          city: city,
          state: state,
        },
        serviceId: cartdata.serviceId,
        vehicle: JSON.parse(localStorage.getItem("vehicle")),
        isNewAddress: true,
      };

      createNewOrder(paymentRes).then((result) => {
        if (result.status === 200) {
          sessionStorage.removeItem("cart");
        }
        let razorOrderId = result.data.razorpayOrderId;
        const options = {
          key: razorpayKey,
          amount: servicePrice * 100,
          currency: "INR",
          name: "Mr Buddy",
          description: "Purchase Basic Service",
          order_id: result.data.id,
          handler: async function (response) {
            navigate("/payment-success", { state: { razorOrderId } });
          },
          prefill: {
            email: user.email,
            contact: user.phone_number,
          },
          notes: {
            address: "Pune Cdac Acts",
          },
          theme: {
            color: "#1f5215",
          },
        };
        let paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }); 
    } else {
      // Display error message to the user
      toast.warning(
        "Please fill all the required details before placing an order.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          style: {
            width: "400px",
          },
        }
      );
    }
  };
  const deleteHandler = () => {
    sessionStorage.clear();
    navigate("/car-service");
  };
  // Function to get the next 4 days
  const getNext4Days = () => {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Array.from({ length: 4 }, (_, index) => {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + index + 1);

      const dayIndex = nextDay.getDay();
      const day = days[dayIndex];
      const date = nextDay.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return { date, day };
    });
  };

  const next4Days = getNext4Days();

  const getTimeSlots = () => {
    const startHourMorning = 10;
    const startHourAfternoon = 12;
    const endHourAfternoon = 16;

    const morningSlots = Array.from({ length: 2 }, (_, index) => {
      const startTime = startHourMorning + index;
      const endTime = startTime + 1;

      return { startTime, endTime, category: "Morning" };
    });

    const afternoonSlots = Array.from({ length: 4 }, (_, index) => {
      const startTime = startHourAfternoon + index;
      const endTime = startTime + 1;

      return { startTime, endTime, category: "Afternoon" };
    });

    const eveningSlots = Array.from({ length: 2 }, (_, index) => {
      const startTime = endHourAfternoon + index + 1;
      const endTime = startTime + 1;

      return { startTime, endTime, category: "Evening" };
    });

    return { morningSlots, afternoonSlots, eveningSlots };
  };

  const { morningSlots, afternoonSlots, eveningSlots } = getTimeSlots();
  const getCartFromsessionStorage = () => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
      console.log(cart);
      setCartdata(cart);
    } else {
      console.log("Cart is empty");
    }
  };
  useEffect(() => {
    getCartFromsessionStorage();
  }, []);

  const getAddressDetails = (line1, line2, city, state) => {
    console.log("getting address in Cart ");
    setStreet(line1);
    setArea(line2);
    setCity(city);
    setState(state);
    setIsAddressReady(true);
    console.log(line1, line2, city, state);
  };
  return (
    <div>
      {cartdata.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <div>
          <h2 className="p-2 m-2">Shopping Cart</h2>
          <div className="container main-container-cart">
            <div className="row">
              <div className="col-md-8 p-2">
                <div className="date-time-section">
                  <h2>Select Pick Up Date</h2>
                  {/* Delivery date */}
                  <div className="date-box-container">
                    {next4Days.map((day, index) => (
                      <div
                        key={index}
                        className={`date-box ${
                          selectedDate === day.date ? "selected-date" : ""
                        }`}
                        onClick={() => handleDateClick(day.date)}
                      >
                        <span>{day.date}</span>
                        <span>{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <h2>Choose PickUp Time</h2>
                  <div className="time-slot-container">
                    <div className="time-slot-category">
                      <h4>Morning Slots</h4>
                      {morningSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`time-slot ${
                            selectedTimeSlot &&
                            selectedTimeSlot.startTime === slot.startTime
                              ? "selected-time-slot"
                              : ""
                          }`}
                          onClick={() => handleTimeSlotClick(slot)}
                        >
                          <span>{`${slot.startTime}:00 - ${slot.endTime}:00`}</span>
                        </div>
                      ))}
                    </div>

                    <div className="time-slot-category">
                      <h4>Afternoon Slots</h4>
                      {afternoonSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`time-slot ${
                            selectedTimeSlot &&
                            selectedTimeSlot.startTime === slot.startTime
                              ? "selected-time-slot"
                              : ""
                          }`}
                          onClick={() => handleTimeSlotClick(slot)}
                        >
                          <span>{`${slot.startTime}:00 - ${slot.endTime}:00`}</span>
                        </div>
                      ))}
                    </div>

                    <div className="time-slot-category">
                      <h4>Evening Slots</h4>
                      {eveningSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`time-slot ${
                            selectedTimeSlot &&
                            selectedTimeSlot.startTime === slot.startTime
                              ? "selected-time-slot"
                              : ""
                          }`}
                          onClick={() => handleTimeSlotClick(slot)}
                        >
                          <span>{`${slot.startTime}:00 - ${slot.endTime}:00`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h2>Add Address</h2>
                  <AddressSection addAddress={getAddressDetails} />
                </div>
              </div>
              <div className="col-md-4 bill-container">
                <h3>Bill Details</h3>
                <div className="row bill-row">
                  <div className="col-md-6 ">
                    <p>Item Total</p>
                    <p>Safety & Warranty Fees</p>
                  </div>
                  <div className="col-md-6 flexColEnd">
                    <p>Rs. {cartdata.price}</p>
                    <p>Rs. 99</p>
                  </div>
                </div>
                <div className="row bill-row">
                  <div className="col-md 6">
                    <h4>You Pay</h4>
                  </div>
                  {cartdata.price !== undefined && (
                    <div className="col-md-6 flexColEnd">
                      <h4>{cartdata.price + 99}</h4>
                    </div>
                  )}
                </div>
                <div className="row button-row">
                  <div className="col-md-12 d-flex justify-content-end">
                    <button
                      className="button bill-button"
                      onClick={deleteHandler}
                    >
                      Delete From Cart
                    </button>
                    <button
                      className="button bill-button"
                      onClick={createOrder}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
