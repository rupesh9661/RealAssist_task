import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: true,
      text: 'Line Chart Of Arrests In Burglary',
    },
  },
};

const CrimeDataChart = () => {
  const [label, setLabel] = useState();
  const [arrestData, setArrestData] = useState({});
  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

    // Fetch data from the API
    axios.get(apiUrl)
      .then((response) => {
        const data = response.data.data;

        // Extract years and arrests data
        let years = [];
        let arrests = [];
        data.forEach((each, i) => {
          years[i] = each.data_year;
            arrests[i] = each.Burglary;
        })

        setArrestData(arrests);
        setLabel(years);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [])

  const chartData = {
    labels: label,
    datasets: [
      {
        label: 'Arrests',
        data: arrestData,
        borderColor: '#1463ff',
        backgroundColor: '#1463ff',
      }
    ],
  }
  return <section style={{padding:'5px 20px'}}>
    <header style={{ display:'flex', justifyContent:'space-between', borderBottom: '2px solid #1463ff', position:'sticky', top:'5px'}}>
      <img src={'realAssistLogo.png'} height={30}/>
      <p>New Ashok Nagar, Delhi, 110096</p>
    </header>
    <section style={{ background:'aliceblue', padding:'20px'}}>
    <div style={{display:'flex'}}>
      <span style={{width:'10%'}}>Crime </span>
      <hr style={{border: '2px solid #1463ff', width:'90%', height:'0px'}} />
    </div>

    <div style={{ background:'white', margin:'20px 0px'}}>
      <Line options={options} data={chartData} height={100}/>
    </div>
    </section>
    <footer style={{ display:'flex', justifyContent:'space-between', borderTop: '2px solid #1463ff', position:'sticky', bottom:'10px'}}>
      <p>Report Generated On {new Date().toLocaleDateString()}</p>
      <p>RealAssist | Crime | Arrests | Report</p>
    </footer>
  </section>
}
export default CrimeDataChart;

