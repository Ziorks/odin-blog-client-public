import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(() => {
      return true;
    });
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Outlet
        context={{
          isLoggedIn,
          handleLogin,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
