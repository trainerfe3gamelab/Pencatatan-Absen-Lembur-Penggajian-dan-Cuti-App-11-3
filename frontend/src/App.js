import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound/NotFound';
import Index from './pages/LandingPage';
import Lupapassword from './pages/login/lupapassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<Lupapassword />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
