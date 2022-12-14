# Interactive Energy Calendar

## Run the Calendar ##
- Clone the git repository 
- Run the git clone in your terminal
- cd into the folder
- Run `npm install` this will install all the necessary dependencies
- Run `npm start` and the project will load. *Note: you will need a properly formated csv file to run this project*

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


## Hover Data for Each Date ##
*When you hover over a shaded date the produced and consumed data will appear*

- For this we will use Material UI and the Popover feature. To install Material UI use the following
`npm install @mui/material @emotion/react @emotion/styled`
- Import Popover and Typography to the EnergyCal.js page. 
- Create two state variables: anchorEl and getHoverDay. anchorEl will be used to determine when the mouse is hovering and when it leaves that div. getHoverDay is used to store the day being hovered over to compare to the csvData.
- The Popover tag will be added to the render in the generateDatesForCurrentWeek method. See the code on that page for how the data is displayed.


## Calculate Individual and Total Energy Spent/Saved ##
*For this a negative value means money was spent and a positive value means money saved*

- In CSVData.js we generate a new key:value pair for the csvData being sent to EnergyCal.js.
- In file at line 89 you will see a .forEach() being used. This will add the total amount saved or spent for each day. 
    - Here is the formula that was used: 
        Produced energy - consumed energy = energy used/saved
    - The energy used/saved is then multiplied by 0.166.
        - According to the US Bureau of Labor Statistics the national average cost for energy is $0.166 / kWh. 
- In EnergyCal.js the information was added to the generateDatesForCurrentWeek method so that when you hover over a date you now also see the amount of money saved or spent.
- To display the total month savings below the calendar a new method is created. This is called getTotal. You can see the code in the file for this function. 
- The method is then called in the render section of the EnergyCal function. 
