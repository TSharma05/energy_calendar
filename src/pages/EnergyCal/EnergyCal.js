import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { 
    format, 
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths,
} from "date-fns";
import "./EnergyCal.css"
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";




export default function EnergyCal(props) {
    // keep track of the selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [anchorEl, setAnchorEl] = useState(null);
    const [getHoverDay, setHoverDay] = useState("");

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setHoverDay(event.currentTarget.innerText);
        
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoverDay("");
    };

    const open = Boolean(anchorEl);

    let csvData = props.data;

    // helps render dates in the currently visible month
    const [activeDate, setActiveDate] = useState(new Date(csvData[0].date));

    // Here is the function to create the header that displays the month and year
    // The header also allows user to toggle between months and select Today to return to current date
    const getHeader = () => {
        return (
            <div className="header" key="header">
                <div className="todayButton" onClick={() => {
                    setSelectedDate(new Date());
                    setActiveDate(new Date());
                }}>Today</div>
                <div className="align-header">
                    <AiOutlineLeft className="navIcon" onClick={() => setActiveDate(subMonths(activeDate, 1))}/>
                    <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>
                    <AiOutlineRight className="navIcon" onClick={() => setActiveDate(addMonths(activeDate, 1))}/>
                </div>
            </div>
        );
    }

    // This function creates the days of the week for the calendar
    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            weekDays.push(
                <div className="day weekNames">
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            );
        }
        return <div className="weekContainer" key="weekNames">{weekDays}</div>
    }

    // This function creates the days of the month for the calendar
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = []
        for (let day = 0; day < 7; day++) {
            
            week.push(
                
                <div className={
                `day ${
                    isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"}
                    ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
                    ${generateHighlight(currentDate)}`}
                    $
                    value={currentDate}
                >
                    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                        {format(currentDate, "d")}
                    </div>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                        pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }} id="popup">
                            {anchorEl != null && 
                                csvData.map((element) => {
                                    let addZero = parseInt(getHoverDay).toLocaleString('en-US', {minimumIntegerDigits: 2})
                                    if(element.day === addZero){
                                        return (
                                            <p>
                                                Produced: {element.generation} kWh <br/>
                                                Consumed: {element.usage} kWh <br/>
                                            </p>
                                        )
                                    } 
                                })}
                        </Typography>
                    </Popover>
                    
                </div>
                
            );
            ;
            currentDate = addDays(currentDate, 1);

            
        }
        
        return <>{week}</>
    }
    
    // this method creates the highlighted region based on the data in the csv file
    const generateHighlight = (date) => {
        let currentDate = date;
        
        for (let i = 0; i < csvData.length; i++){
            if (isSameDay(currentDate, new Date(csvData[i].date))){
                return `${getHighlight(csvData[i].count)}`
            }
        }
    }

    // This method returns the string correlating to the data from the csv file
    const getHighlight = (param) => {
        if (param === 1) {
            return "one"
        }
        else if (param === 2) {
            return "two"
        }
        else if (param === 3) {
            return "three"
        }
        else if (param === 4) {
            return "four"
        }
        else if (param === 5) {
            return "five"
        }
        else {
            return null
        }
    }

    
    

    // This function creates the calendar for the current month
    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(
                generateDatesForCurrentWeek(currentDate, selectedDate, activeDate),
            );
            currentDate = addDays(currentDate, 7);
            
        }
        return <div className="weekContainer" key="getDates">{allWeeks}</div>
    }


  return (
    <div className="energyCal">
      <h1>EnergyCal</h1>
        {getHeader()}
        {getWeekDaysNames()}
        {getDates()}
    </div>  
  );
}