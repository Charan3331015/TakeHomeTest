import React from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const LineChart = (props) => {
  console.log("props",props)
  if(props.chartData){
    const data = props.chartData;
    console.log("dayData", data);
    var datesArray = [];
    var valueArray=[];
    console.log("fulldata",Object.entries(data));

    for(const [key, value] of Object.entries(data)) {
        let D_1 = key.split("-");
        var dateInObject = new Date(D_1[0], parseInt(D_1[1]) - 1, D_1[2]);
        var currentDate= new Date();
        var cutOffDate= new Date("2022","05"-1,"01")
        if(dateInObject>= cutOffDate && dateInObject< currentDate){
            datesArray.push(key);
            valueArray.push(data[key]['4a. close (EUR)']);
        }

        
      }
    const datainputs = {
        labels: datesArray.reverse(),
        datasets: [
          {
            label: "close price (EUR)",
            data: valueArray.reverse(),
            fill: true,
            backgroundColor: "rgba(153, 153, 102)",
            borderColor: "rgba(255, 51, 0)"
          }
        ]
      };

  return (
    
    <div style={{"margin-top": "50px"}}>
      <div class="font-weight-bold" style={{"text-align": "left"}}>Plot of trend</div>
        <Line data={datainputs}/>
    </div>
    
  )
  }
}

export default LineChart