import React, { useContext, useState } from "react";
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { authContext } from "../../helpers/authContext";
import Menu from "../../fragments/menu/menu";
import axios from 'axios';

function Lessons() {
  const { authState } = useContext(authContext);
  const [fileList, setFileList] = useState([]);

  const handleChange = info => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const customRequest = async (options) => {
    const formData = new FormData();
    formData.append('file', options.file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Upload successful');
      options.onSuccess(response.data, options.file);
    } catch (error) {
      message.error('Upload failed');
      options.onError(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Menu />
      {authState.status ? (
        <>
          <p>iesti logat pe contul {authState.username}</p>
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onChange={handleChange}
            accept=".pdf"
            customRequest={customRequest}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </>
      ) : (
        <p>nu iesit logat</p>
      )}
    </div>
  );
}

export default Lessons;
