import "./Profile.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState("");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // You can implement save functionality here, for now, just log the edited profile
    console.log("Edited Profile:", editedProfile);
    setEditMode(false); // Exit edit mode
  };
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("please login first!!");
    } else {
      setEditedProfile({
        name: user.name,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        mobile: user.mobile,
      });
    }
  });
  return (
    <>
      {isAuthenticated ? (
        <div className="profile-container">
          <div className="profile-details">
            <h2>Personal Details</h2>
            {isAuthenticated && editMode ? (
              <div className="edit_details">
                <label htmlFor="name">First Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="name">Last Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="mobile">Mobile Number:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={editedProfile.mobile}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>Name:</b>
                    </td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email:</b>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  {/* Add mobile number if available in user data */}
                  {user.mobile && (
                    <tr>
                      <td>
                        <b>Mobile Number:</b>
                      </td>
                      <td>{user.mobile}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {editMode ? (
              <button className="button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="button" onClick={() => handleEdit(user.email)}>
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Profile;
