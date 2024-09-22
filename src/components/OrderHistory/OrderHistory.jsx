import { FaClock, FaCalendarAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { fetchAllAppointmentsByEmail, fetchAppointmentById } from "../../services/Apis";
const OrderHistory = () => {
  const { user, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState([]);

  const generateInvoice = async (id) => {
    // Create a new PDF document
    
    fetchAppointmentById(id).then((response) => {
      let orderDetails = response.data;
      return orderDetails;
    }).then((orderDetails)=> {
      constructPDF(orderDetails);
    })
    .catch((error) => {
      console.log(error);
    });
    
  };
  const constructPDF = (orderDetails) => {
    const doc = new jsPDF();

    doc.setFontSize(12);

    // Add invoice header
    doc.text("Invoice", 105, 10, { align: "center" });
    doc.line(15, 15, 195, 15); // Horizontal line under the header

    // Add invoice details (two columns)
    const column1X = 15;
    const column2X = 100;

    doc.setFont("bold"); // Set font style to bold

    doc.text("Order ID: " + orderDetails?.orderId, column2X, 30);
    doc.text("Owner Name: " + orderDetails?.ownerName, column2X, 40);

    doc.text("Vehicle Name: " + orderDetails?.ownerVehicleName, column1X, 30);

    doc.text("Transaction Date: " + orderDetails?.txDate, column1X, 40);

    // Add table headers
    doc.text("Item", 15, 50);
    // doc.text('Price', 105, 70);
    doc.text("Total", 185, 50);
    doc.line(15, 52, 195, 52);

    // Add table rows (example data)
    doc.text(orderDetails?.serviceName, 15, 60);
    // doc.text('Rs100', 105, 90);
    doc.text(`Rs ${orderDetails?.amount - 99}`, 180, 60);
    doc.line(125, 70, 195, 70);
    doc.text("Tax:", 150, 80, { align: "right" });
    doc.text("Rs. 99", 195, 80, { align: "right" });
    doc.text("Total Amount:", 150, 90, { align: "right" });
    doc.text(`Rs ${orderDetails?.amount}`, 195, 90, { align: "right" });

    // Save the PDF
    doc.save("invoice.pdf");
  }
  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
          fetchAllAppointmentsByEmail(user.email).then((response) =>{
            // Sort orders by date:
          const sortedOrders = response.data.sort((a, b) => {
            // Assuming pickUpDate is a string representing a date
            return new Date(a.pickUpDate) - new Date(b.pickUpDate);
          });
          setOrders(sortedOrders);
          }).catch((error) => {
            console.error("Error fetching orders:", error);
          });
      }
      fetchData();
    } else {
      toast.warn("please login first!!");
    }
  }, [isAuthenticated , user?.email]);

  const renderSlotBox = (dateString, timeString) => {
    try {
      const timeObject = JSON.parse(timeString);

      // Extracting startTime and endTime
      const { startTime, endTime } = timeObject;

      return (
        <div className="slot-box">
          <div className="slot-time">
            <FaClock /> {`${startTime}:00 - ${endTime}:00`}
          </div>
          <div className="slot-date">
            <FaCalendarAlt /> {dateString}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const renderOrder = (order) => {
    const {
      vehicle: { manufacturer, yearOfManufacturer, fuelType },
      bill: { applicationFee },
      pickUpDate,
      pickUpTime,
      status,
      id,
    } = order;

    const orderCategory =
      status === "BOOKED" ? "ongoing-orders" : "completed-orders";

    return (
      <>
        {isAuthenticated ? (
          <div key={id} className={`order-item ${orderCategory} card mb-3`}>
            <div className="order-details card-body">
              <p className="card-title h5">
                <strong>Model Name:</strong> {manufacturer}
              </p>
              <p>
                <strong>Manufacturer Year:</strong> {yearOfManufacturer}
              </p>
              <p>
                <strong>Fuel Type: </strong> {fuelType}
              </p>
              <p>
                <strong>Price:</strong> Rs.{applicationFee}
              </p>
              {/* <Link
                to={`/order-details/${id}`}
                className="button details-button"
              >
                Details
              </Link> */}
              <button
                className="button details-button"
                onClick={() => generateInvoice(id)}
              >
                Generate Invoice
              </button>

              <hr />
              <p className="slot card-subtitle mb-2 text-muted">
                Selected Slot
              </p>
              {renderSlotBox(pickUpDate, pickUpTime)}
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${status.toLowerCase()}`}>
                  {status}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="order-history-container container mt-4">
          <div className="order-history-header">
            <h2>Order History</h2>
          </div>
          <div className="order-history-content">
            <div className="ongoing-orders">
              <h3>Ongoing Orders</h3>
              <hr />
              {orders
                .filter((order) => order.status === "BOOKED")
                .map(renderOrder)}
            </div>
            <div className="completed-orders">
              <h3>Completed Orders</h3>
              <hr />
              {orders
                .filter((order) => order.status === "COMPLETED")
                .map(renderOrder)}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default OrderHistory;
