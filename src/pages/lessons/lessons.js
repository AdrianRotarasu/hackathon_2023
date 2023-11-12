import React, { useContext, useState, useEffect } from "react";
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { authContext } from "../../helpers/authContext";
import Menu from "../../fragments/menu/menu";
import axios from 'axios';
import Quiz from 'react-quiz-component';
import "./lessons.css";
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import Axios from "axios";
import { notification } from "antd";

function Lessons() {

  const [isSelecting, setIsSelecting] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [addCourse, setAddCourse] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('')
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/fetchCourseName",
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setCoursesList(response.data)
        let template = [];
        for (let i = 0; i < response.data.length; i++) {
          const name = response.data[i].name;


          const itemTemplate = {
            value: name,
            label: name,
          };


          template.push(itemTemplate);
        }
        setCoursesList(template);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  // MODAL PENTRU ADAUGAREA UNEI MATERII NOI
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await Axios.post(
      "http://localhost:3001/addCourse",
      {
        course: addCourse,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    if (response.data.type === "success") {
      notification[response.data.type]({
        message: response.data.message,
        description: response.data.description,
      });
      setOpen(false);
      setConfirmLoading(false);
      setAddCourse("")
    }

  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    setAddCourse(e.target.value);
  };
  ///////////////////////////////

  //PENTRU SELECTAREA MATERIEI
  const onChange = (value) => {
    setSelectedCourse(value);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  /////////////////////////
  const renderCustomResultPage = (obj) => {
    console.log(obj);
    const handleOk = async () => {
      setConfirmLoading(true);
      const response = await Axios.post(
        "http://localhost:3001/addScore",
        {
          score: obj,
          course: selectedCourse,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.data.type === "success") {
        notification[response.data.type]({
          message: response.data.message,
          description: response.data.description,
        });
        setOpen(false);
        setConfirmLoading(false);
      }
    }
    handleOk()
      
    return (
      <div>
        This is a custom result page. You can use obj to render your custom result page
      </div>
    )
  }

  const quizz = {
    "quizTitle": "React Quiz Component Demo",
    "questions": quizes
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

      setQuizes(response.data)
      console.log(response.data)
      setStartQuiz(true);
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

  const uploadPDF = () => {

    setIsSelecting(false);
  };

  return (
    <div>
      <Menu />
      <div className='quizContainer'>
        



        {isSelecting ? (
          <div>
            <Button type="primary" onClick={showModal}>
              Adauga o materie noua
            </Button>
            <Modal
              title="Adauga o materie noua"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <>
                <Input placeholder="Numele materiei"
                  value={addCourse}
                  onChange={handleInputChange}
                />
              </>

            </Modal>
            <h3> sau </h3>
            <p> Selecteaza o materie deja adaugata </p>

            <Select
              showSearch
              placeholder="Selecteaza"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={coursesList}
            />
            <Button type="primary" onClick={() => uploadPDF()}>START</Button>
          </div>
        )
          :
          
          (<>

          {startQuiz ? <div>
            <div className='quizContent'>
            <Quiz quiz={quizz} onComplete={renderCustomResultPage} />
          </div>
            </div> 
            : 
            <div>
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onChange={handleChange}
              accept=".pdf"
              customRequest={customRequest}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload></div>}

            
          </>)}

      </div>
    </div>
  );
}

export default Lessons;
