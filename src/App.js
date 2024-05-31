import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import NotFound from './pages/NotFound/NotFound';// Tambahkan komponen NotFound untuk menangani 404

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} /> {/* Menangani rute yang tidak ditemukan */}
      </Routes>
    </Router>
  );
}

export default App;
