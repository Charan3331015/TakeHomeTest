import React, { useEffect, useState } from 'react';
import csvFile from './digital_currency_list.csv';
import Papa from 'papaparse'
import { csv } from 'd3';
import Axious from 'axios'
import CurrentDayStatistics from './CurrentDayStatistics';
import DonutPlot from './DonutPlot';
import LineChart from './LineChart';

function Home(props) {

    const [digCurrencyData, setData] = useState([]);
    const [visualizeDataFlag, setvisualizeDataFalg] = useState(false);
    const [digiCurrencyDailyData, setDailyData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    window.history.replaceState(null, 'home',"/home")
    useEffect(() => {
        // Papa.parse('/Users/admin/Desktop/Tiru/project/interviewtask/src/asserts/digital_currency_list.csv', {
        //     header: true,
        //     complete: function (results) {
        //       console.log("tiru",results.data)
        //     },
        //   });
        csv(csvFile).then(data => {
            setData(data);
        })
    }, []);
    const onOptionChange = (e) => {
        var presentCurrency = e.target.value;
        Axious.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=' + presentCurrency + '&market=EUR&apikey=A4A5UWNYFSY5YRZM')
            .then((response) => {
                if (!response.data['Error Message']) {
                    setDailyData(response.data);
                    //abc['Time Series (Digital Currency Daily)']['2022-06-11']['1a. open (EUR)']
                    setvisualizeDataFalg(true)
                    setErrorMsg("");
                }
                else {
                    setErrorMsg("Data not available for selected digital currency.");
                    setDailyData({});
                }
            }).catch(function (error) {
                alert(error.message)
            })
    }

    console.log("data", digCurrencyData)

    return (
        <div>
            <nav className="bg-dark navbar-dark navbar">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <span style={{width: "45%", "text-align": "left"}}>
                <img src={require('./logo.png')} style={{"width":"80px", "height":"40px"}}/>
                </span>
                    <h3>Home</h3>
                    <span style={{width: "45%", "text-align": "right", "margin-top": "5px"}}>
                 Welcome <span  class="font-weight-bold">{props.userData.toUpperCase()} </span>
                </span>
                </div>
            </nav>
            <div>
                <div className="select-container" style={{ margin: "10px" }}>
                    <span  class="font-weight-bold">Select Digital Currency</span>
                    <select onChange={(e) => onOptionChange(e)} style={{height: "30px",width: "200px"}}>
                        <option>Select</option>
                        {digCurrencyData.map((option) => (
                            <option value={option.currencycode}>{option.currencyname}</option>
                        ))}
                    </select>
                    <div  class="font-weight-bold" style={{ color: "red", "margin-top": "10px" }}>{errorMsg}</div>
                </div>
                <CurrentDayStatistics data={digiCurrencyDailyData} />
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                        <LineChart chartData={digiCurrencyDailyData['Time Series (Digital Currency Daily)']}></LineChart>
                        </div>
                        <div class="col-12">
                        <DonutPlot data={digiCurrencyDailyData} />
                        </div>
                    </div>
                </div>
                {/* <LineChart chartData={digiCurrencyDailyData['Time Series (Digital Currency Daily)']}></LineChart>
                <DonutPlot data={digiCurrencyDailyData} /> */}
            </div>
        </div>
    )
}
export default Home;