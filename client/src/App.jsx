import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState("landing");

  if (user) return <Dashboard />;
  if (page === "login") return <Login onSwitch={() => setPage("register")} onBack={() => setPage("landing")} />;
  if (page === "register") return <Register onSwitch={() => setPage("login")} onBack={() => setPage("landing")} />;
  return <Landing onLogin={() => setPage("login")} onRegister={() => setPage("register")} />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <AppContent />
      </div>
    </AuthProvider>
  );
}