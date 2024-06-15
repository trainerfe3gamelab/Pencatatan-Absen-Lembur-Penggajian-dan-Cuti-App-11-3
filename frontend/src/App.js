import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound/NotFound';
import Index from './pages/LandingPage';
import User from './pages/User/user';
import Lupapassword from './pages/login/lupapassword';
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoute element={Index} />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route
          path="/forgot-password"
          element={<PublicRoute element={Lupapassword} />}
        />
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={Admin} role="admin" />}
        />
        <Route
          path="/User/*"
          element={<ProtectedRoute element={User} role="employee" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
