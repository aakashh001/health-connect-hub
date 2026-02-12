import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "user" | "doctor" | "admin" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  user: { id: string; name: string; email: string } | null;
  doctorApproved: boolean;
}

interface AuthContextType extends AuthState {
  loginAsUser: () => void;
  loginAsDoctor: (email: string, password: string) => Promise<boolean>;
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem("innovarise_auth");
    return stored ? JSON.parse(stored) : { isAuthenticated: false, role: null, user: null, doctorApproved: false };
  });

  useEffect(() => {
    localStorage.setItem("innovarise_auth", JSON.stringify(auth));
  }, [auth]);

  const loginAsUser = () => {
    setAuth({
      isAuthenticated: true,
      role: "user",
      user: { id: "u_" + Date.now(), name: "Patient User", email: "patient@example.com" },
      doctorApproved: false,
    });
  };

  const loginAsDoctor = async (email: string, password: string): Promise<boolean> => {
    // Placeholder: check against n8n or Supabase
    await new Promise(r => setTimeout(r, 800));
    const approved = email === "doctor@clinic.com"; // Mock: only this email is approved
    setAuth({
      isAuthenticated: true,
      role: "doctor",
      user: { id: "d_1", name: "Dr. Priya Sharma", email },
      doctorApproved: approved,
    });
    return approved;
  };

  const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (email === "admin@innovarise.com" && password === "admin123") {
      setAuth({
        isAuthenticated: true,
        role: "admin",
        user: { id: "admin_1", name: "Super Admin", email },
        doctorApproved: false,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: null, user: null, doctorApproved: false });
    localStorage.removeItem("innovarise_auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, loginAsUser, loginAsDoctor, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
