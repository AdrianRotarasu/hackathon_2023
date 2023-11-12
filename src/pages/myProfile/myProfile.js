import "./myProfile.css";
import { authContext } from "../../helpers/authContext"
import Menu from  "../../fragments/menu/menu"
import {useContext} from "react";
import React, { useState, useEffect } from "react"; 
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import Axios from "axios";
import { notification } from "antd";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function MyProfile() {

    const [coursesList, setCoursesList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('')

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
      
      const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Grade',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

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

  const getGrades = async () => {
    const response = await Axios.post(
      "http://localhost:3001/fetchGrades",
      {
        course: selectedCourse,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data)
  };

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

  return (
    <>

      <Menu />
      <div className='profileContainer'>
      <div className='profileContent'>
        <div className="searchBox">
            <p>Selecteaza cursul unde vrei sa vezi statisticile:</p>
      <Select
              showSearch
              placeholder="Selecteaza"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={coursesList}
            />
            <Button type="primary" onClick={() => getGrades()}>START</Button>
            </div>
            <div style={{width: '1000px', marginBottom: '30px'}}>
                <div className="containerChart">
                <Line options={options} data={data} />
                </div>
            </div>
            
      </div>
      </div>

    </>
    
  );

}

export default MyProfile;