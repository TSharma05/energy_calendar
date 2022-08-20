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


export default function EnergyCal() {

    // keep track of the selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    // helps render dates in the currently visible month
    const [activeDate, setActiveDate] = useState(new Date());

    // Here is the function to create the header that displays the month and year
    // The header also allows user to toggle between months and select Today to return to current date
    const getHeader = () => {
        return (
            <div className="header">
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
        return <div className="weekContainer">{weekDays}</div>
    }

    // This function creates the days of the month for the calendar
    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = []
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            week.push(
                <div className={
                    `day ${
                        isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} 
                        ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""} 
                        ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
                        onClick={() => {
                            setSelectedDate(cloneDate);
                        }}
                >{format(currentDate, "d")}</div>
            );
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>
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
                generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
            );
            currentDate = addDays(currentDate, 7);
        }
        return <div className="weekContainer">{allWeeks}</div>
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