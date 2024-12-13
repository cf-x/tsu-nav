import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./pages/map";
import Building from "./pages/building";
import Home from "./pages/home";
import SearchPage from "./pages/search";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/map" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/plan/:id" element={<Building />} />
        <Route path="*" element={<Navigate to="/?code=404" replace />} />
      </Routes>
    </Router>
    <div className="w-full text-center py-12">by <span className="text-blue-400 cursor-pointer">Innovative technologies club</span></div>
  </StrictMode>
);
