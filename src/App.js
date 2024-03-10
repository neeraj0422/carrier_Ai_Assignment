import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login component */}
        <Route path="/login" element={<Login />} />
        {/* Private route for the Dashboard component */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        {/* Route for the root path */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
