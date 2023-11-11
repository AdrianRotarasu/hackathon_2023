import "./home.css";
import { authContext } from "../../helpers/authContext"

import {useContext} from "react";

function Home() {
  const { authState } = useContext(authContext);

  return (
    <div>
      {authState.status?
      <>
      <p>iesti logat pe contul {authState.username}</p>
      </>
      :
      <>
      
      <p>nu iesit logat</p>
      </>
    }
    </div>
    
  );

}

export default Home;