import "./lessons.css";
import { authContext } from "../../helpers/authContext"
import Menu from "../../fragments/menu/menu"
import { useContext, useState } from "react";
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
function Lessons() {
  const { authState } = useContext(authContext);

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  return (
    <div>
      <Menu />
      {authState.status ?
        <>
          <p>iesti logat pe contul {authState.username}</p>
          <Button
          type="primary"
          icon={<UploadOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!
        </Button>

        </>
        :
        <>

          <p>nu iesit logat</p>
        </>
      }
    </div>

  );

}

export default Lessons;