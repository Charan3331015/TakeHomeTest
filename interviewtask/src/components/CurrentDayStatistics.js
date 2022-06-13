import React from 'react';
import LineChart from './LineChart';

const CurrentDayStatistics = (props) => {
    //const data = props.data
    console.log("datap", props);
    console.log("abc", props.data)
    console.log("abc", Object.keys(props.data).length)
    if (Object.keys(props.data).length) {
        const data = props.data
        const current = new Date();
        let currentDate = current.getFullYear() + '-' + ('0' + (current.getMonth() + 1)).slice(-2) + '-' + ('0' + current.getDate()).slice(-2);
        console.log("datetiru", currentDate);

        function getPreviousDay(date = new Date()) {
            const previous = new Date(date.getTime());
            previous.setDate(date.getDate() - 1);
          
            return previous;
          }
          let previousDate= getPreviousDay()
          previousDate= previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
         let currectPrice= parseFloat(data['Time Series (Digital Currency Daily)'][currentDate]['1a. open (EUR)']).toFixed(2)
          let Variation= parseFloat(data['Time Series (Digital Currency Daily)'][currentDate]['1a. open (EUR)']-data['Time Series (Digital Currency Daily)'][previousDate]['4a. close (EUR)']).toFixed(2);
          let highPrice = parseFloat( data['Time Series (Digital Currency Daily)'][currentDate]['2a. high (EUR)']).toFixed(2);
          let lowPrice = parseFloat(data['Time Series (Digital Currency Daily)'][currentDate]['3a. low (EUR)']).toFixed(2)
    return (
        <div style={{"margin-top":"40px"}}>
            <div class="container">
                <div class="row" style={{"margin":"0", "padding":"0"}}>
                    <div class="col-4" style={{"margin":"0", "padding":"0"}}>
                       <span class="font-weight-bold"> Currenct Price (EUR):</span> {currectPrice}
                    </div>
                    <div class="col-4" style={{"margin":"0", "padding":"0"}}>
                    <span class="font-weight-bold">  Variation (EUR):</span>  {Variation}
                    </div>
                    <div class="col-2" style={{"margin":"0", "padding":"0"}}>
                    <span class="font-weight-bold">  High:  </span> {highPrice}
                    </div>
                    <div class="col-2" style={{"margin":"0", "padding":"0"}}>
                    <span class="font-weight-bold"> Low:  </span> {lowPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

}

export default CurrentDayStatistics