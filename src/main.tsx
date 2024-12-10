import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './pages/home';
import Building from './pages/building';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<Building />} />
        <Route path="*" element={<Navigate to="/?code=404" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
);