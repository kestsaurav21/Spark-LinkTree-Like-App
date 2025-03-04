import "./index.css";
import { useOutletContext } from "react-router-dom";

const fills = [
  { id: 1, value: "standard", label: "Standard", borderRadius: "0" },
  { id: 2, value: "medium", label: "Medium", borderRadius: "8px" },
  { id: 3, value: "rounded", label: "Rounded", borderRadius: "96px" },
];

const outlines = [
  {
    id: 1,
    value: "standard",
    label: "Standard",
    borderRadius: "0",
    outline: "1px solid black",
  },
  {
    id: 2,
    value: "medium",
    label: "Medium",
    borderRadius: "8px",
    outline: "1px solid black",
  },
  {
    id: 3,
    value: "rounded",
    label: "Rounded",
    borderRadius: "96px",
    outline: "1px solid black",
  },
];

const hardShadows = [
  {
    id: 1,
    value: "standard",
    label: "Standard",
    borderRadius: "0",
    boxShadow: "4px 4px 0px #000000",
  },
  {
    id: 2,
    value: "medium",
    label: "Medium",
    borderRadius: "8px",
    boxShadow: "4px 4px 0px #000000",
  },
  {
    id: 3,
    value: "rounded",
    label: "Rounded",
    borderRadius: "96px",
    boxShadow: "4px 4px 0px #000000",
  },
];

const softShadows = [
  {
    id: 1,
    value: "standard",
    label: "Standard",
    borderRadius: "0",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
  },
  {
    id: 2,
    value: "medium",
    label: "Medium",
    borderRadius: "8px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
  },
  {
    id: 3,
    value: "rounded",
    label: "Rounded",
    borderRadius: "96px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.16)",
  },
];

export default function Buttons() {
  const {
    user,
    setUser,
    customButtonColor,
    setCustomButtonColor,
    customButtonTextColor,
    setCustomButtonTextColor,
  } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => {
      const appearanceSettings = prevUser?.appearanceSettings;
      if (name === "softShadow") {
        appearanceSettings.button.hardShadow = "";
        appearanceSettings.button.outline = "";
      } else if (name === "hardShadow") {
        appearanceSettings.button.softShadow = "";
        appearanceSettings.button.outline = "";
      } else if (name === "outline") {
        appearanceSettings.button.softShadow = "";
        appearanceSettings.button.hardShadow = "";
      } else if (name === "backgroundColor") {
        appearanceSettings.button.fill = "";
        appearanceSettings.button.backgroundColor = value;
        appearanceSettings.button.outline = "";
    } else if (name === "color") {
        appearanceSettings.button.color = value;
        setCustomButtonTextColor(value);
    } else if (name === "fill") {
        appearanceSettings.button.fill = value;
        appearanceSettings.button.backgroundColor = "#000000";
        appearanceSettings.button.outline = "";
        setCustomButtonColor("#000000");
    }
      appearanceSettings.button[name] = value;
      return { ...prevUser, appearanceSettings };
    });
  };

  return (
    <div className="box-wrapper">
      <h3>Buttons</h3>
      <div className="box">
        <label className="fill-name special-label">Fill</label>
        <div className="fill-options">
          {fills?.map((fill) => (
            <div
              key={fill.value}
              className={`fill-option ${
                user?.appearanceSettings.button.fill === fill.value ? "selected" : ""
              }`}
              style={{ borderRadius: fill.borderRadius }}
              onClick={() =>
                handleChange({ target: { name: "fill", value: fill.value } })
              }></div>
          ))}
        </div>
        <label className="outline-name special-label">Outline</label>
        <div className="outlines-options">
          {outlines?.map((outline) => (
            <div
              key={outline.value}
              className={`outline-option ${
                user?.appearanceSettings.button.outline === outline.value
                  ? "selected"
                  : ""
              }`}
              style={{
                borderRadius: outline.borderRadius,
                outline: outline.outline,
              }}
              onClick={() =>
                handleChange({
                  target: { name: "outline", value: outline.value },
                })
              }></div>
          ))}
        </div>
        <label className="outline-name special-label">Hard Shadow</label>
        <div className="hard-shadow-options">
          {hardShadows?.map((hardShadow) => (
            <div
              key={hardShadow.value}
              className={`hard-shadow-option ${
                user?.appearanceSettings.button.hardShadow === hardShadow.value
                  ? "selected"
                  : ""
              }`}
              style={{
                borderRadius: hardShadow.borderRadius,
                boxShadow: hardShadow.boxShadow,
              }}
              onClick={() =>
                handleChange({
                  target: { name: "hardShadow", value: hardShadow.value },
                })
              }></div>
          ))}
        </div>
        <label className="soft-shadow-name special-label">Soft Shadow</label>
        <div className="soft-shadow-options">
          {softShadows?.map((softShadow) => (
            <div
              key={softShadow.value}
              className={`soft-shadow-option ${
                user?.appearanceSettings.button.softShadow === softShadow.value
                  ? "selected"
                  : ""
              }`}
              style={{
                borderRadius: softShadow.borderRadius,
                boxShadow: softShadow.boxShadow,
              }}
              onClick={() =>
                handleChange({
                  target: { name: "softShadow", value: softShadow.value },
                })
              }></div>
          ))}
        </div>
        <label className="button-color special-label">Button color</label>
        <div className="selected-color">
          <input
            className="square"
            name="backgroundColor"
            type="color"
            value={customButtonColor}
            onChange={(customButtonColor) => {
              setCustomButtonColor(customButtonColor.target.value);
              handleChange({
                target: {
                  name: "backgroundColor",
                  value: customButtonColor.target.value,
                },
              });
            }}
          />
          <input
            type="text"
            className="color-view special-input-layer"
            name="backgroundColor"
            value={customButtonColor}
            onChange={(customButtonColor) => {
              setCustomButtonColor(customButtonColor.target.value);
              handleChange({
                target: {
                  name: "backgroundColor",
                  value: customButtonColor.target.value,
                },
              });
            }}
          />
        </div>

        <label className="button-color special-label">Button font color</label>
        <div className="selected-color">
          <input
            className="square"
            name="color"
            type="color"
            value={customButtonTextColor}
            onChange={(customButtonTextColor) => {
              setCustomButtonTextColor(customButtonTextColor.target.value);
              handleChange({
                target: {
                  name: "color",
                  value: customButtonTextColor.target.value,
                },
              });
            }}
          />
          <input
            type="text"
            className="color-view special-input-layer"
            name="color"
            value={customButtonTextColor}
            onChange={(customButtonTextColor) => {
              setCustomButtonTextColor(customButtonTextColor.target.value);
              handleChange({
                target: {
                  name: "color",
                  value: customButtonTextColor.target.value,
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
