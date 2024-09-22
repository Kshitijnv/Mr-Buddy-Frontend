import React, { useEffect } from "react";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { creatOrGetUser, saveCartDetails } from "../../services/Apis";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const adminPanelEmail = process.env.REACT_APP_ADMIN_EMAIL;
  useEffect(() => {
    console.log("component render");
    if (isAuthenticated) {
      // Store user information in sessionStorage
      async function fetchData() {
        if (user) {
          let userForDb = {
            username: user.sub,
            phoneNumber: user.phone_number,
            emailId: user.email,
            firstName: user.given_name,
            lastName: user.family_name,
          };
          creatOrGetUser(userForDb).then((response) => {
            if (response.data.cart != null) {
              sessionStorage.setItem(
                "cart",
                JSON.stringify(response.data.cart.carServices)
              );
            }
          }).catch((error) => {
            console.log(`error: ${error}`);
          });
         
        }
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      fetchData();
    }
  }, [isAuthenticated, user]);

  const loginHandler = () => {
    loginWithRedirect();
  };

  async function handleLogout() {
    let carService;
    if (JSON.parse(sessionStorage.getItem("cart")) != null) {
      carService = JSON.parse(sessionStorage.getItem("cart")).serviceId;
    }
    let userForDb = {
      username: user.sub,
      serviceId: carService,
    };
    saveCartDetails(userForDb).then((response) => {
      if(response.status === 200){
        sessionStorage.clear(); // Clear sessionStorage
        logoutSync();
      }
    }).catch((error)=>{
      console.log(`error occourred: ${error}`);
      
    });
    
  }
  const logoutSync = async () => {
    await logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <section className="h-wrapper">
      <div className="h-container">
        <Link to="/">
          <img src="./Images/Brandlogo.png" alt="logo"/>
        </Link>
        <nav className="flexCenter h-menu">
          <Link to="/">Home</Link>
          <Link to="/car-selector">Car services</Link>
          <Link to="/ContactUs">Contact Us</Link>
          {isAuthenticated && user.email === adminPanelEmail ? (
            <>
              <Link to="/appointments">Appointments Booked</Link>
              <Link to="#" onClick={handleLogout}>
                Log Out
              </Link>
            </>
          ) : (
            <>
              {isAuthenticated && <Link to="/cart">Cart</Link>}

              {isAuthenticated ? (
                <></>
              ) : (
                <button onClick={loginHandler} className="font-size-15">Log In</button>
              )}
              {isAuthenticated && (
                <div className="dropdown">
                  <span className="font-size-15">Welcome, {user.name}</span>
                  <div className="dropdown-content">
                    <Link to="profile">Profile</Link>
                    <Link to="order-history">Order History</Link>
                    <Link to="my-cars">My Cars</Link>
                    <Link to="ManageAddress">Manage Address</Link>
                    <Link to="#" onClick={handleLogout}>
                      Log Out
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </section>
  );
};
export default Header;
