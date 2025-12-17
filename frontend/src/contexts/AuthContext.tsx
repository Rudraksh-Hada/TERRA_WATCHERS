import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";
import { registerUser, loginUser } from "@/services/api";

interface AuthContextType {
  user: User | null;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    employeeId: string;
  }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // REGISTER → FastAPI /register (returns { success: true })
  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    employeeId: string;
  }): Promise<boolean> => {
    try {
      const res = await registerUser(data); // { success: true }

      if (res.success) {
        const roleMap: Record<string, string> = {
          AD: "Administrator",
          SV: "Supervisor",
          SM: "Safety Manager",
          OP: "Operator",
        };

        const prefix = data.employeeId.slice(0, 2);

        const newUser: User = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          employeeId: data.employeeId,
          jobRole: roleMap[prefix] ?? "Employee",
        };

        setUser(newUser);
        return true;
      }

      return false;
    } catch (err) {
      console.error("REGISTER FAILED:", err);
      return false;
    }
  };

  // LOGIN → FastAPI /login (returns { success: true } or { success: true, user })
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await loginUser({ email, password }); // { success, user? }

      if (res.success && res.user) {
        setUser(res.user);
        return true;
      }

      // login endpoint said success but no user: treat as failure
      return false;
    } catch (err) {
      console.error("LOGIN FAILED:", err);
      setUser(null);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
