import { createContext, useState, useEffect } from "react";
import auth from "../core/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [pinAccess, setPinAccess] = useState(false);
  const [isDarkMode, setIsDark] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const dataAuth = await auth.checkAuth();
      setUser(dataAuth.user);
      setPin(dataAuth.pin);

      const darkMode = await auth.getDarkMode();
      setIsDark(darkMode === "true");

      setLoading(false);
    }
    loadUser();
  }, []);

  const setDarkMode = async (isDark) => {
    // console.log("setDarkMode", isDark);
    await auth.setDarkMode(isDark ? "true" : "false");
    setIsDark(isDark);
  };

  const login = async (username, password) => {
    const error = await auth.login(username, password);
    if (error) {
      return { ...username, error: loginError };
    }
    const data = await auth.getUser();
    setUser(data);
  };

  const logout = async () => {
    auth.logout();
    setUser(null);
    setPin(null);
  };

  const savePin = async (newPin) => {
    await auth.savePin(newPin);
    setPin(newPin);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pin,
        pinAccess,
        login,
        logout,
        savePin,
        setPinAccess,
        isDarkMode,
        setDarkMode,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
