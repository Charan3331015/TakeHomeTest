import React from 'react'
import DonutChart from 'react-donut-chart';
const DonutPlot = (props) => {

  if (Object.keys(props.data).length) {
    const data = props.data['Time Series (Digital Currency Daily)'];
    console.log("dayData", data);
    var datesArray = [];
    var volumeArray = [];
    console.log("fulldata", Object.entries(data));

    for (const [key, value] of Object.entries(data)) {
      console.log("key", key);
      let D_1 = key.split("-");
      var dateInObject = new Date(D_1[0], parseInt(D_1[1]) - 1, D_1[2]);
      console.log("dateinobj", dateInObject);
      var currentDate = new Date();
      var previousDate = currentDate.getDate();
      currentDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
      currentDate = currentDate.split("-");
      previousDate = new Date(currentDate[0], parseInt(currentDate[1]) - 1, currentDate[2] - previousDate + 1);
      console.log("preData", previousDate);
      currentDate = new Date();
      console.log("curentDta", currentDate);
      var cutOffDate = new Date("2022", "05" - 1, "01");
      if (dateInObject >= previousDate && dateInObject < currentDate) {
        datesArray.push(key);
        volumeArray.push(data[key]['5. volume']);
      }
    }
    var averageVolume = 0
    for (var volume in volumeArray) { //To Calculate average volume
      averageVolume = averageVolume + parseFloat(volumeArray[volume]);
    }
    averageVolume = averageVolume / volumeArray.length
    var dayVolumeExceedCount = 0
    for (var dayVolume of volumeArray) { //To Calculate count of day volume exceeds average volume
      if (dayVolume > averageVolume)
        dayVolumeExceedCount = dayVolumeExceedCount + 1;
    }
    var percentageOfVolumeExceed = dayVolumeExceedCount / volumeArray.length
    percentageOfVolumeExceed = percentageOfVolumeExceed * 100
    console.log("perce", percentageOfVolumeExceed);



    return (
      <div style={{"margin-top": "50px"}}>
        <div  class="font-weight-bold" style={{"text-align": "left"}} >Donut plot visualisation</div>
        <DonutChart
          data={[
            {
              label: '% of volume exceeded average volume',
              value: percentageOfVolumeExceed,
            },
            {
              label: '% of volume not exceeded average volume',
              value: 100-percentageOfVolumeExceed,
              isEmpty: false,
            },
          ]}
        />;
      </div>
    )
  }
}

export default DonutPlot