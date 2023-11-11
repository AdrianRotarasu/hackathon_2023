import React, { useContext, useState } from "react";
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { authContext } from "../../helpers/authContext";
import Menu from "../../fragments/menu/menu";
import axios from 'axios';
import Quiz from 'react-quiz-component';
import "./lessons.css";
import { Button, Modal } from 'antd';

function Lessons() {

  const [isSelecting, setIsSelecting] = useState(true);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  
  const renderCustomResultPage = (obj) => {
    console.log(obj);
    //Aici david
    return (
      <div>
        This is a custom result page. You can use obj to render your custom result page
      </div>
    )
  }

  const quizz =  {
    "quizTitle": "React Quiz Component Demo",
    "questions": [
      {
        "question": "How can you access the state of a component from inside of a member function?",
        "questionType": "text",
        "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
        "answerSelectionType": "single",
        "answers": [
          "this.getState()",
          "this.prototype.stateValue",
          "this.state",
          "this.values"
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "point": "1"
      },
      {
        "question": "ReactJS is developed by _____?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "Google Engineers",
          "Facebook Engineers"
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "point": "1"
      },
      {
        "question": "ReactJS is an MVC based framework?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "True",
          "False"
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "point": "1"
      },
    ]
  }
  

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
      <div className='quizContainer'>
        <div className='quizContent'>
          <Quiz quiz={quizz} onComplete={renderCustomResultPage}/>
        </div>
        
      </div>
      
      {isSelecting ? (
        <>

        </>
      )
    :
    (<>

    </>)}
      
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
