// ManageAddress.js
import React, {useState} from "react";
import { MdAddLocationAlt } from "react-icons/md";
import "./ManageAddress.css";
import AddNewAddress from "../AddNewAddress/AddNewAddress";
const ManageAddress = () => {
    const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  
    const handleAddNewAddressToggle = () => {
      setShowAddNewAddress(!showAddNewAddress);
    };
  
    return (
      <div className="main">
      <h3 className="mng-add-title">Manage Addresses</h3>
      <div className="manage-address-container">
        <div className="address-box">
          <span className="span1"><MdAddLocationAlt />&nbsp;Add new address</span>
          <button className="addnewbtn" onClick={handleAddNewAddressToggle}>Add New</button>
        </div>
        {showAddNewAddress && <AddNewAddress />}
      </div>
      </div>
    );
  };
  
  export default ManageAddress;
  