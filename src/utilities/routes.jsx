import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyAccount from "../pages/MyAccount";
import Post from "../pages/Post";
import User from "../pages/User";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "posts/:postId", element: <Post /> },
      { path: "users/:userId", element: <User /> },
    ],
  },
];

export default routes;
