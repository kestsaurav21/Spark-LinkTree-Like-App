import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function Profile({ setFile }) {
  const { user, setUser } = useOutletContext();
  const inputRef = useRef(null);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, profilePicture: imageUrl }));
    }
    setFile(file);
  };

  const handleRemoveImage = () => {
    if (user.profilePicture) {
      setUser((prevUser) => ({ ...prevUser, profilePicture: "" }));
    }
  };

  const handleChange = (e) => {    
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="box-wrapper">
      <h3>Profile</h3>
      <div className="box">
        <div className="profile-image-container">
          <div className="top-avatar">
            <img
              className="spark-mobile-top-avatar"
              src={
                user?.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fpic.png?alt=media&token=3af8019c-1e47-4cbf-a130-bcfdabc11b08"
              }
              height={96}
              width={96}
              alt="User Avatar"
            />
          </div>
          <div className="image-actions">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="file-input"
              ref={inputRef}
            />
            <button
              className="btn-primary full-width"
              onClick={() => inputRef.current.click()}>
              Pick an image
            </button>
            <button
              className="remove btn-outline full-width"
              onClick={handleRemoveImage}
              disabled={!user?.profilePicture}>
              Remove
            </button>
          </div>
        </div>
        <div className="profile-user-container">
          <div className="form-group special-input-layer">
            <label htmlFor="userName" className="special-label">
              Profile
            </label>
            <input
              name="userName"
              className="spark-input"
              id="userName"
              value={user?.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group special-input-layer">
            <label htmlFor="biography" className="special-label">
              biography
            </label>
            <textarea
              name="biography"
              id="biography"
              className="spark-input"
              type="textarea"
              value={user?.biography}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
    setFile: PropTypes.func
}