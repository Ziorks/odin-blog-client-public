import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet
        context={{
          user,
          handleLogin,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
