import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import { authContext } from "./helpers/authContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {

const [authState, setAuthState] = useState({
  username: "",
  status: false,
});

useEffect(() => {
  const fetchUserAuth = async () => {
    const response = await Axios
    .get("http://localhost:3001/isUserAuth", {
      headers: {
    "x-access-token": localStorage.getItem("token"),
      },
    })
    if (response.data.error) {
      setAuthState({ ...authState, status: false });
    } else {
      setAuthState({
        username: response.data.user.username,
        status: true,
      });
    }
  }

  fetchUserAuth();
}, []);


  return (
    <>

<authContext.Provider value={{ authState, setAuthState }}>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
