import "./calendar.css";
import { authContext } from "../../helpers/authContext"
import Menu from  "../../fragments/menu/menu"
import {useContext} from "react";
import React, { useState } from "react"; 

function Calendar() {
  const { authState } = useContext(authContext);

  return (
    <div>
      <Menu />
      {authState.status?
      <>
      <p>iesti logat pe contul {authState.username} si esti pe pagina calendar</p>

      

      </>
      :
      <>
      
      <p>nu iesit logat</p>
      </>
    }
    </div>
    
  );

}

export default Calendar;