// src/components/Signup.js
import React, { useState } from "react";
import api from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    brokerApiKey: "",
    brokerApiSecret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submitting:", formData);
    try {
      const body = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        brokerAPIDetails: {
          apiKey: formData.brokerApiKey,
          secretKey: formData.brokerApiSecret,
        },
      };
      // Send a POST request to your backend's /api/signup route with formData
      const response = await api.post("/api/auth/signup", body);
      console.log("Response data after submitting:", response.data);

      // If the signup is successful, automatically log in the user
      if (response.data.success) {
        // Implement logic to log in the user (e.g., store token in localStorage, redirect to the dashboard)
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    // Render the signup form
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange} // Added handleChange here
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange} // Added handleChange here
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange} // Added handleChange here
          />
        </div>
        <div>
          <label htmlFor="brokerApiKey">Broker API Key:</label>
          <input
            type="text"
            id="brokerApiKey"
            name="brokerApiKey"
            value={formData.brokerApiKey}
            onChange={handleChange} // Added handleChange here
          />
        </div>
        <div>
          <label htmlFor="brokerApiSecret">Broker API Secret:</label>
          <input
            type="text"
            id="brokerApiSecret"
            name="brokerApiSecret"
            value={formData.brokerApiSecret}
            onChange={handleChange} // Added handleChange here
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
