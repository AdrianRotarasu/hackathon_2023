import Lessons from "./pages/lessons/lessons";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Calendar from "./pages/calendar/calendar";
import MyProfile from "./pages/myProfile/myProfile";
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
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
