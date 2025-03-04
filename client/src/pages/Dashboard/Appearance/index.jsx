import { useOutletContext } from "react-router-dom";
import Mobile from "../Links/Mobile";
import "./index.css";
import Layout from "./Layout";
import Buttons from "./Buttons";
import Font from "./Font";
import Themes from "./Themes";

export default function Appearance() {
  const {
    user,
    setUser,
    showMobileMenu,
    hideOtherMenu,
    customButtonColor,
    saveUserLinksShopsData,
    customButtonTextColor,
    customFontFamily,
    customThemeStyle,
    setCustomButtonColor,
    openMobileMenu,
    generateShareLink
  } = useOutletContext();
  useOutletContext();

  return (
    <div className="appearance-container">
      {showMobileMenu && (
        <Mobile
          user={user}
          customButtonColor={customButtonColor}
          customButtonTextColor={customButtonTextColor}
          customFontFamily={customFontFamily}
          customThemeStyle={customThemeStyle}
          saveUserLinksShopsData={saveUserLinksShopsData}
          generateShareLink={generateShareLink}
        />
      )}
      {!hideOtherMenu && (
        <div className="appearance-content">
          <Layout user={user} setUser={setUser} />
          <Buttons
            user={user}
            setUser={setUser}
            customButtonColor={customButtonColor}
            setCustomButtonColor={setCustomButtonColor}
          />
          <Font />
          <Themes />
          <div className="btn-container">
            <button
              className="btn-primary"
              onClick={() => saveUserLinksShopsData(user)}>
              Save
            </button>
          </div>
          <button
            className="btn-outline only-mobile"
            onClick={() => openMobileMenu()}>
            {" "}
            👁️ Preview
          </button>
        </div>
      )}
    </div>
  );
}
