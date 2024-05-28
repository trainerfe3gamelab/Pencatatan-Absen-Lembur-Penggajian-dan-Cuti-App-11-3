import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
