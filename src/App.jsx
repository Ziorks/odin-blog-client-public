import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet
        context={{
          user,
          handleLogin,
          handleLogout,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
