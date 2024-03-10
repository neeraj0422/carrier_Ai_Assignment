import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = true; // Example: Assume user is always authenticated

  // If authenticated, render the element (component) passed to the PrivateRoute,
  // otherwise, redirect to the login page
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
