import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import './App.css';

const App = () => (
  <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Dashboard />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Routes>
);

export default App;
