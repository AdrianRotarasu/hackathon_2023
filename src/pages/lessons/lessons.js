import React, { useContext, useState } from "react";
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { authContext } from "../../helpers/authContext";
import Menu from "../../fragments/menu/menu";
import axios from 'axios';
import Quiz from 'react-quiz-component';
import "./lessons.css";

function Lessons() {

  const renderCustomResultPage = (obj) => {
    console.log(obj);
    return (
      <div>
        This is a custom result page. You can use obj to render your custom result page
      </div>
    )
  }

  const quizz =  {
    "quizTitle": "React Quiz Component Demo",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "nrOfQuestions": "4",
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
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
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
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
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
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "10"
      },
      {
        "question": "Which of the following concepts is/are key to ReactJS?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "Component-oriented design",
          "Event delegation model",
          "Both of the above",
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "30"
      },
      {
        "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        "questionType": "photo",
        "answerSelectionType": "single",
        "answers": [
          "https://dummyimage.com/600x400/000/fff&text=A",
          "https://dummyimage.com/600x400/000/fff&text=B",
          "https://dummyimage.com/600x400/000/fff&text=C",
          "https://dummyimage.com/600x400/000/fff&text=D"
        ],
        "correctAnswer": "1",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
      },
      {
        "question": "What are the advantages of React JS?",
        "questionType": "text",
        "answerSelectionType": "multiple",
        "answers": [
          "React can be used on client and as well as server side too",
          "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
          "React components have lifecycle events that fall into State/Property Updates",
          "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
        ],
        "correctAnswer": [1, 2, 4],
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
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
