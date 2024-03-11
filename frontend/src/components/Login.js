import React, { useState } from 'react';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Track whether login or signup form is active

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    brokerApiKey: '',
    brokerApiSecret: '',
  });

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup forms
    setFormData({
      email: '',
      password: '',
      username: '',
      brokerApiKey: '',
      brokerApiSecret: '',
    }); // Clear form data
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending request');
  
    try {
      if (isLogin) {
        // Send login request
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        // Handle successful login
        console.log('Login successful');
      } else {
        // Send signup request
        console.log('Signup form submitted:', formData.username, formData.email, formData.password, formData.brokerApiKey, formData.brokerApiSecret);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div >
    <h1>{isLogin ? 'Login' : 'Signup'}</h1>
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="brokerApiKey">Broker API Key:</label>
          <input
            type="text"
            id="brokerApiKey"
            name="brokerApiKey"
            value={formData.brokerApiKey}
            onChange={handleChange}
          />
        </div>
      )}
      {!isLogin && (
        <div>
          <label htmlFor="brokerApiSecret">Broker API Secret:</label>
          <input
            type="text"
            id="brokerApiSecret"
            name="brokerApiSecret"
            value={formData.brokerApiSecret}
            onChange={handleChange}
          />
        </div>
      )}
      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
    </form>
    <button onClick={handleToggle}>{isLogin ? 'Switch to Signup' : 'Switch to Login'}</button>
  </div>);
};

export default Login;
