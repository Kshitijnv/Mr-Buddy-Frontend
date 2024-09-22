// AddNewAddress.js
import React from "react";
import "./AddNewAddress.css";

const AddNewAddress = () => {
  return (
    <div className="add-new-address-container">
      <h3>Add New Address</h3>
      <div className="form-group">
        <label htmlFor="locality">Locality:</label>
        <input type="text" id="locality" name="locality" />
      </div>
      <div className="form-group">
        <label htmlFor="house-flat">House/Flat No:</label>
        <input type="text" id="house-flat" name="house-flat" />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" />
      </div>
      <div className="form-group">
        <label htmlFor="pincode">Pincode:</label>
        <input type="text" id="pincode" name="pincode" />
      </div>
      <div className="form-group">
        <label htmlFor="full-name">Full Name:</label>
        <input type="text" id="full-name" name="full-name" />
      </div>
      <button className="btn save-btn">Save</button>
    </div>
  );
};

export default AddNewAddress;
