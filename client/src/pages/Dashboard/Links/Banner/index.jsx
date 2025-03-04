import { useOutletContext } from "react-router-dom";
import "./index.css";

const colors = ["#000000", "#D3D333", "#342B26"];

export default function Banner() {
  const { user, setUser, openMobileMenu } = useOutletContext();
  const bannerColor =
    user && user.appearanceSettings ? user.appearanceSettings.bannerColor : "#000000";

  const handleChange = (e) => {
    setUser((prevUser) => {
      const appearanceSettings = prevUser.appearanceSettings;
      appearanceSettings.bannerColor = e.target.value;
      return { ...prevUser, appearanceSettings };
    });
  };

  return (
    <div className="box-wrapper">
      <h3>Banner</h3>
      <div className="box box-special">
        <div className="banner-container">
          <div
            className="banner-preview"
            style={{ backgroundColor: bannerColor }}>
            <button
              className="btn-outline only-mobile"
              onClick={() => openMobileMenu()}>
              {" "}
              👁️ Preview
            </button>
            <div className="banner-preview-img">
              <img
                src={
                  user?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fpic.png?alt=media&token=3af8019c-1e47-4cbf-a130-bcfdabc11b08"
                }
                alt="banner"
                height={"100%"}
                width={"100%"}
              />
            </div>
            <div className="banner-preview-userName">
              <label>@{user?.userName}</label>
            </div>
          </div>
          <label className="special-label">Custom Background Color</label>
          <div className="banner-color-picker">
            {colors?.map((color) => (
              <div
                key={color}
                className="bannerColor"
                style={{
                  backgroundColor: color,
                  borderRadius: "50%",
                  height: 40,
                  width: 40,
                  border: bannerColor === color ? "4px solid grey" : "none",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChange({ target: { value: color } })
                }></div>
            ))}
          </div>
          <div className="selected-color">
            <input
              className="square"
              type="color"
              value={bannerColor}
              onChange={handleChange}
            />
            <input
              type="text"
              className="color-view special-input-layer"
              value={bannerColor}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
