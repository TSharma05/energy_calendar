import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import EnergyCal from "../../pages/EnergyCal/EnergyCal";


export default function CSVData() {

    // state to store the parsed csv data
    const [csvData, setCsvData] = useState([]);

    // method to view file contents via the onChange event
    const changeHandler = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvData(results.data);
            },
        });
    };

    // method to combine data that is on the same day
    const getData = csvData.map((item) => {
        // create a date variable
        const date = item["Date & Time"].split(" ")[0];

        // pull just day from date
        const day = date.split("-")[1];
        
        // for similar dates, add the usage data together
        // for similar dates, add the generation data together
        if (csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
        })){
            const usage = csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
            }).map((item) => { return parseFloat(item["Usage [kW]"]);
            }).reduce((a, b) => { return a + b;
            }).toFixed(1);

            const generation = csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
            }).map((item) => { return parseFloat(item["Generation [kW]"]);
            }).reduce((a, b) => { return a + b;
            }).toFixed(1);

            const [year, month, day] = date.split("-");
            const dateFormat = new Date(+year, +month - 1, +day);


            return {strDate: date, date: dateFormat, usage: usage, generation: generation, day:day}; 
        } else {
            return "No data"
        }
    })

    // method to clean up data so it's not repeating
    const cleanData = getData.filter((item, index) => {
        const _value = JSON.stringify(item);
        return index === getData.findIndex((obj) => { return JSON.stringify(obj) === _value})
    });

    // console.log(cleanData)

    // add count key to each item to help with color coding the days based on energy generated
    cleanData.forEach(object => {
        if (object.generation >= 1 && object.generation <= 10) {
            object.count = 1;
          } 
          else if (object.generation >= 11 && object.generation <= 20) {
            object.count = 2;
          }
          else if (object.generation >= 21 && object.generation <= 30) {
            object.count = 3;
          }
          else if (object.generation >= 31 && object.generation <= 40) {
            object.count = 4;
          }
          else if (object.generation >= 40.1) {
            object.count = 5;
          }
          else {
            object.count = 0;
          }
    })

    var revData = cleanData.reverse();

    // method to send data to the parent component
    const sendData = () => {
        if (csvData.length > 0) {
            return (
                <div>
                    <EnergyCal data={revData} />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Please upload a csv file</h1>
                </div>
            )
        }
    }

    return (
        <div className="csvData">
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{display: "block", margin:"10px auto"}}
            />
            {sendData()}
        </div>
    )
}