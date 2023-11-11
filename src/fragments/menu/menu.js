import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect} from "react"
import "./menu.css"
import { authContext } from "../../helpers/authContext"
import { notification } from 'antd';


function Menu() {

  const navigate = useNavigate();
const [startMenu] = useState("animation start-" + window.location.pathname.slice(1, 30));
const { authState, setAuthState } = useContext(authContext);
  
const logout = () => {
  console.log(startMenu)
    localStorage.removeItem("token");
    setAuthState({ username: "",email: "", id: 0, pfp_src: "", status: false });
    navigate("/login");
    notification["success"]({
      message: "Logged out successfully",
      description: "",
    });
  };

  return (
    <div>
      {authState.status?
      <>
      <nav className="navLogged">
		<Link to="/lessons" className="nav-link" style={{ textDecoration: 'none' }}>Lessons</Link>
		<Link to="/calendar" className="nav-link" style={{ textDecoration: 'none' }}>Calendar</Link>
    <Link to="/myprofile" className="nav-link" style={{ textDecoration: 'none' }}><div>{authState.username}</div></Link>
    <button onClick={logout} className="nav-link">LOGOUT</button>
    
    <div className={(startMenu === 'animation start-multiplayer' ? ('animation start-play'):(startMenu))}></div>		
        
	  </nav>
      </>
      :
      <>
      <nav className="nav">
        <Link to="/login" className="nav-link" style={{ textDecoration: 'none' }}>Login</Link>
		<Link to="/register" className="nav-link" style={{ textDecoration: 'none' }}>Register</Link>
		<div className={(startMenu === 'animation start-multiplayer' ? ('animation start-play'):(startMenu))}></div>
        
        
	</nav>
      </>
      }
	
    </div>
  );
}

export default Menu;