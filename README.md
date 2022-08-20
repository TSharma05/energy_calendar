# Interactive Energy Calendar

## Create the Calendar ##
install the necessary packages:
`npm install date-fns --save`
`npm install react-icons --save`

- Create a new folder in src called pages. Inside pages add the following files: `EnergyCal.js` and `EnergyCal.css`
- Set up the EnergyCal.js and import it to App.js. Render the EnergyCal function.
- Move to the EnergyCal.js file. Here we will create the calendar.
- Two state variables are needed: selectedDate and active Date. Add these to the EnergyCal function.
-  Create the header function that displays selected month, allows toggling between months and jumps calendar to current day if Today button is selected
- Create a function to generate the week days names. This is called getWeekDaysNames in the code
- Create a function that generates the actual days of the month. This is called generateDatesForCurrentWeek. This will be called in the getDates function
- Create a function that calls generateDatesForCurrentWeek and populates the month displayed with the correct dates on the correct day of the week.  This function is called getDates.
- In the return section of the EnergyCal function call three functions: getHeader(), getWeekDaysNames(), and getDates(). 
    - The calendar should now be functional and allow you to toggle between months.
