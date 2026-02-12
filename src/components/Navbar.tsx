import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="text-gradient">InnovaRise</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Search Hospitals
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register-doctor">
                <Button size="sm">Register Clinic</Button>
              </Link>
            </>
          ) : (
            <>
              {role === "doctor" && (
                <Link to="/doctor-dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              )}
              {role === "admin" && (
                <Link to="/admin-dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
              )}
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-2 animate-fade-in">
          <Link to="/search" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Search Hospitals</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register-doctor" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Register Clinic</Link>
            </>
          ) : (
            <>
              {role === "doctor" && <Link to="/doctor-dashboard" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
              {role === "admin" && <Link to="/admin-dashboard" className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>Admin</Link>}
              <button className="block py-2 text-sm text-destructive" onClick={() => { handleLogout(); setMobileOpen(false); }}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
