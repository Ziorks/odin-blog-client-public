import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleLogin = ({ user, token }) => {
    localStorage.setItem("token", token);
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
