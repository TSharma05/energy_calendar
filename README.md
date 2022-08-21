# Interactive Energy Calendar

## Create the Calendar ##
install the necessary packages:
`npm install date-fns --save`
`npm install react-icons --save`

- Create a new folder in src called pages. Inside pages add the following files: `EnergyCal.js` and `EnergyCal.css`
- Set up the EnergyCal.js and import it to App.js. Render the EnergyCal function.
- Move to the EnergyCal.js file. Here we will create the calendar. Make sure you are passing props to EnergyCal. This will be needed later for the csv data.
- Two state variables are needed: selectedDate and active Date. Add these to the EnergyCal function.
-  Create the header function that displays selected month, allows toggling between months and jumps calendar to current day if Today button is selected
- Create a function to generate the week days names. This is called getWeekDaysNames in the code
- Create a function that generates the actual days of the month. This is called generateDatesForCurrentWeek. This will be called in the getDates function
- Create a function that calls generateDatesForCurrentWeek and populates the month displayed with the correct dates on the correct day of the week.  This function is called getDates.
- In the return section of the EnergyCal function call three functions: getHeader(), getWeekDaysNames(), and getDates(). 
    - The calendar should now be functional and allow you to toggle between months.

## Create Component to Pull CSV data ##
install the necessary package:
`npm install papaparse`
- Add a new folder to src called components. Add a folder called CSVData and add CSVData.js
- Create state variable to store parsed CSV data. Generate method that parses the data during the onChange event.
- Create a method that combines all data for the same date.  The method is called getData in the code.
- The data needed to be changed to JSON. The method to do this is called cleanData
- cleanData had to have a count added to make the highlighting of each date easier
- Import EnergyCal to the CSVData. The data is then sent to the EnergyCal page
- In App.js change EnergyCal to CSVData.  Be sure to import CSVData to App.js as well.

## Add Shaded Regions for Each Date ##
*Now that the data has been passed from CSVData to EnergyCal as props we can use it to create the shaded regions for each date*

- This will be done in the EnergyCal.js file
- To make the data easier to use create a new variable:
    - let csvData = props.data
- We want the calendar to jump to the month where the data is represented. To do this setActiveData using csvData[0].date. 
- Need a method that generates strings that will be used to assign the correct className for each set of data. This is called getHighlight in the code.
- The next method needed will loop through the csvData and assign the correct highlight region based on the count key from the data. This is called generateHighlight.
- Inside the generateDatesForCurrentWeek method we will call the generateHighlight method. This will create the appropriate shaded region for each day.
- In the EnergyCal.css file add the correct background color for each count option (1-5) so the correct colors are displayed.
