import "./PaymentSuccess.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { fetchOrderDetailsById } from "../../services/Apis";
const PaymentSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.razorOrderId || null; // Retrieve order ID from state
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const generateInvoice = async () => {
    // Create a new PDF document
    const doc = new jsPDF();

    let order = orderDetails.appointmentDTO;
    doc.setFontSize(12);

    // Add invoice header
    doc.text("Invoice", 105, 10, { align: "center" });
    doc.line(15, 15, 195, 15); // Horizontal line under the header

    // Add invoice details (two columns)
    const column1X = 15;
    const column2X = 100;

    doc.setFont("bold"); // Set font style to bold

    doc.text("Order ID: " + orderId, column2X, 30);
    doc.text("Owner Name: " + order.ownerName, column2X, 40);

    doc.text("Vehicle Name: " + order.ownerVehicleName, column1X, 30);

    doc.text("Transaction Date: " + orderDetails.transactionDate, column1X, 40);

    // Add table headers
    doc.text("Item", 15, 50);
    // doc.text('Price', 105, 70);
    doc.text("Total", 185, 50);
    doc.line(15, 52, 195, 52);

    // Add table rows (example data)
    doc.text(order.serviceName, 15, 60);
    // doc.text('Rs100', 105, 90);
    doc.text(`Rs ${orderDetails.applicationFee - 99}`, 180, 60);
    doc.line(125, 70, 195, 70);
    doc.text("Tax:", 150, 80, { align: "right" });
    doc.text("Rs. 99", 195, 80, { align: "right" });
    doc.text("Total Amount:", 150, 90, { align: "right" });
    doc.text(`Rs ${orderDetails.applicationFee}`, 195, 90, { align: "right" });

    // Save the PDF
    doc.save("invoice.pdf");
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
        fetchOrderDetailsById(orderId).then((response) => {
          setOrderDetails(response.data);
        }).catch((error) =>{
          setError(error);
        }).finally(() =>{
          setIsLoading(false); // Hide loading indicator
        });
    };
    fetchOrderDetails();
  }, [orderId]);
  // Display order details dynamically

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading order details...</div>
      ) : error ? (
        <div className="error">
          Error fetching order details: {error.message}
        </div>
      ) : (
        <div className="container border m-5">
          <div className="row">
            <div className="col-md-12">
              <div className="first-row">
                <h1>Payment Successful!</h1>
                <img
                  src="./Images/checkmark.png"
                  alt="checkmark successful"
                  className="checkmark"
                />
              </div>
              <p>Thank you for your booking.</p>
            </div>
          </div>
          <div className="row transaction">
            <div className="col-md-6">
              <p>Order ID</p>
              <p>Amount</p>
              <p>Transaction Date</p>
            </div>
            <div className="col-md-6">
              <p>{orderId}</p>
              <p>{orderDetails.applicationFee}</p>
              <p>{orderDetails.transactionDate}</p>
            </div>
          </div>
          <button
            className="button details-button"
            onClick={() => generateInvoice()}
          >
            Generate Invoice
          </button>
          <Link to="/">
            <button className="button">Back To Home</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
