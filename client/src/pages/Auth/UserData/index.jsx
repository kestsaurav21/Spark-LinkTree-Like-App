import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import * as yup from "yup";
import api from "../../../service/axiosInstance";
import "./index.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "Business", value: "BU", icon: <Icon icon="noto:office-building" /> },
  { key: "Creative", value: "CR", icon: <Icon icon="unjs:theme-colors" /> },
  { key: "Education", value: "ED", icon: <Icon icon="emojione:books" /> },
  {
    key: "Entertainment",
    value: "EN",
    icon: <Icon icon="emojione-v1:musical-notes" />,
  },
  {
    key: "Fashion & Beauty",
    value: "FA",
    icon: <Icon icon="twemoji:dress" />,
  },
  {
    key: "Food & Beverage",
    value: "FO",
    icon: <Icon icon="noto:pizza" />,
  },
  {
    key: "Government & Politics",
    value: "GO",
    icon: <Icon icon="codicon:law" />,
  },
  {
    key: "Health & Wellness",
    value: "HE",
    icon: <Icon icon="twemoji:red-apple" />,
  },
  { key: "Non-Profit", value: "NP", icon: <Icon icon="noto:growing-heart" /> },
  { key: "Other", value: "OT", icon: <Icon icon="noto:growing-heart" /> },
  { key: "Tech", value: "TE", icon: <Icon icon="fa-solid:desktop" /> },
  {
    key: "Travel & Tourism",
    value: "TR",
    icon: <Icon icon="emojione:airplane" />,
  },
];


const schema = yup.object().shape({
  userName: yup.string().required("Please enter your userName*")
});

export default function UserData({ userName = "", category = "BU" }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: userName,
    category: category,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await api.put("/user/update", formData);
      if (response.status===200) {
        navigate("/links");
      }
    } catch (err) {
      const formattedErrors = {};
      err?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="userData-container">
      <p>For a personalized Spark experience</p>
      <form className="user-info" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName" className="special-label">
            Username
          </label>
          <input
            id="userName"
            className="spark-input"
            type="text"
            name="userName"
            onChange={handleChange}
            value={formData.userName}
            placeholder="Tell us your userName"
          />
          {errors.userName && <span className="error">{errors.userName}</span>}
        </div>
        <div className="form-group">
          <p>Select one category that best describes your Linktree:</p>
          <div className="select-category">
            {categories.map((category) => (
              <div
                key={category.key}
                className={`category ${
                  formData.category === category.value ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData((prev) => ({...prev, category: category.value}))
                }
                }>
                {category.icon}
                <span className="category-text">{category.key}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-primary full-width">Continue</button>
      </form>
    </div>
  );
}

UserData.propTypes = {
  userName: PropTypes.string,
  category: PropTypes.string,
};
