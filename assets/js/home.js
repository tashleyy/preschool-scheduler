function setUpHomePage() {
    var year = getParameterByName('year'); //looks in URL to get correct year
    if (year == null) //If there is no argument in the url, it gets the current year
    {
        year = getCorrectYear();
    }
    var yearInt = parseInt(year);
    var yearNext = yearInt + 1;
    var yearPrev = yearInt - 1;
    var yearTwoNext = yearNext + 1;

    //creates page header with appropriate years
    $('#yearHeader').append(year + "/" + yearNext.toString());

    //creates navigation buttons at the bottom of the window
    $('#previousYearButton').append("<a href=\"?year=" + yearPrev.toString() + "\">" +
        "<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>" +
        yearPrev.toString() + "/" + year + "</a>");
    $('#nextYearButton').append("<a href=\"?year=" + yearNext + "\">" + yearNext.toString() 
    + "/" + yearTwoNext.toString() + 
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>" +
         "</a>");
    
    //goes through database and fills in calendar
    displayStudentsOnCalendar(yearInt);
}

function displayStudentsOnCalendar(year) {
    buildCalendarHeader(); //adds static titles to the calendar
    var add = "<tbody align=\"left\">";

    //adds AM/PM to the top of each column
    add += "<tr>";
    add += "<td></td>";
    for (var i = 0; i < 5; i++) {
        add += "<th>AM</th>";
        add += "<th>PM</th>";
    }
    add += "</tr>";
    $('#monthCalendar').append(add);

    //fills in the numbers for the calendar school year
    populateArrayForYear(year); 
}

//makes a get request for all students in the calendar
function populateArrayForYear(year) {
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {
            returnArray =  populateWithSuccessfulRateSchedule(data, year);
            appendRemainingTable(returnArray);
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function appendRemainingTable(populatedArray)
{
    var months = ["September", "October", "November", "December", "January",
    "February", "March", "April", "May", "June", "July", "August"];

    var add = "";
    for (var i = 0; i < 12; i++)
    {
        add += "<tr><td>" + months[i] + "</td>"
        for (var j = 0; j < 5; j++) {
            for (var k = 0; k < 2; k++) {  
                var numStudents =  populatedArray[i][j][k];
                if (numStudents > 12) {
                    add += "<td bgcolor=\"#F95E76\">"
                } else {
                    add += "<td>";
                }
                add += populatedArray[i][j][k].toString();
                add += "</td>";
            }
        }
        add += "</tr>"
    }

    add += "</tbody>";
    $('#monthCalendar').append(add);

}

class MonthAndYear {
    constructor(year, month) {
        this.year = year;
        this.month = month;
    }

    incrementMonth() {
        this.month++;
        if (this.month == 12) {
            this.month = 0;
            this.year++;
        }
    }

    toString() {
        return "Year: " + this.year + ", Month: " + this.month;
    }

    getMonth() {
        return this.month;
    }

    static getCopyOfSmallest(first, second)
    {
        if (MonthAndYear.lessThan(first, second)){
            return new MonthAndYear(first.year, first.month);
        }
        return new MonthAndYear(second.year, second.month);
    }

    static getCopyOfLargest(first, second)
    {
        if (MonthAndYear.lessThan(first, second)){
            return new MonthAndYear(second.year, second.month);
        }
        return new MonthAndYear(first.year, first.month);
    }

    static makeFromString(dateString)
    {
        var splitString = dateString.split("-");
        var year = parseInt(splitString[0]);
        var month = parseInt(splitString[1]);
        return new MonthAndYear(year, month);
    }

    static lessThan(first, second)
    {
        if (first.year != second.year) {
            return first.year < second.year;
        }
        return first.month < second.month;
    }

    static equalTo(first, second)
    {
        return (first.year == second.year) && (first.month == second.month);
    }
}

//iterates through an array of students and fills in the attendance
//numbers for the schoolyear
function populateWithSuccessfulRateSchedule(students, year) {
    //This maps a certain month to the index that it will be on our table.
    //For example, October corresponds to 10, but because this is a school
    //year calendar, we are going to put it in row 1.  That is why
    //monthToIndex[10]=1
    var monthToIndex = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3];

    //creates the array that will contain student attendance.  Everything
    //initialized to 0.
    var months = new Array(12);
    for (var i = 0; i < months.length; i++) {
        months[i] = new Array(5);
        for (var j = 0; j < 5; j++) {
            months[i][j] = new Array(2);
            for (var k = 0; k < 2; k++) {
                 months[i][j][k] = 0;
            }
        }
    }
    //Earliest month on the calendar is September, latest is August
    var earliestApplicableDate = new MonthAndYear(year, 8);
    var latestApplicableDate = new MonthAndYear(year + 1, 7);
    
    //Iterates through students and adds their rate schedule to the calendar
    for (var i = 0; i < students.length; i++) {
        var currStudent = students[i];
        for (var j = 0; j < currStudent.timePeriods.length; j++) {

            var timePeriod = currStudent.timePeriods[j];
        
            var studentStartDate = MonthAndYear.makeFromString(currStudent.startDate);
            var rateScheduleStartDate = MonthAndYear.makeFromString(rateSchedule.startMonth);
            var startDate = MonthAndYear.getCopyOfLargest(studentStartDate, rateScheduleStartDate);
        
            var studentEndDate = MonthAndYear.makeFromString(currStudent.endDate);
            var rateScheduleEndDate = MonthAndYear.makeFromString(rateSchedule.endMonth);
            var endDate = MonthAndYear.getCopyOfSmallest(rateScheduleEndDate, studentEndDate);

            if (!(MonthAndYear.lessThan(endDate, earliestApplicableDate)) && !MonthAndYear.lessThan(latestApplicableDate, startDate)) {
            
                var actualStart = MonthAndYear.getCopyOfLargest(startDate, earliestApplicableDate);
                var actualEnd = MonthAndYear.getCopyOfSmallest(latestApplicableDate, endDate);

                var currDate = actualStart;
            
                while (!MonthAndYear.lessThan(actualEnd, currDate)) {
                    var monthArray = makeSmallArray(rateSchedule.monday);
                    months[monthToIndex[currDate.month]][0][0] += monthArray[0];
                    months[monthToIndex[currDate.month]][0][1] += monthArray[1];

                    monthArray = makeSmallArray(rateSchedule.tuesday);
                    months[monthToIndex[currDate.month]][1][0] += monthArray[0];
                    months[monthToIndex[currDate.month]][1][1] += monthArray[1];

                    monthArray = makeSmallArray(rateSchedule.wednesday);
                    months[monthToIndex[currDate.month]][2][0] += monthArray[0];
                    months[monthToIndex[currDate.month]][2][1] += monthArray[1];

                    monthArray = makeSmallArray(rateSchedule.thursday);
                    months[monthToIndex[currDate.month]][3][0] += monthArray[0];
                    months[monthToIndex[currDate.month]][3][1] += monthArray[1];

                    monthArray = makeSmallArray(rateSchedule.friday);
                    months[monthToIndex[currDate.month]][4][0] += monthArray[0];
                    months[monthToIndex[currDate.month]][4][1] += monthArray[1];

                    currDate.incrementMonth();
                } 
            }
        } 
    }
    return months;
}

function makeSmallArray(dayString)
{
    var returnArray = [0, 0];

    if(dayString == 'full')
    {
        returnArray[0] = 1;
        returnArray[1] = 1;
    }
    else if(dayString == 'am')
    {
        returnArray[0] = 1;
    }
    else if(dayString == 'pm')
    {
        returnArray[1] = 1;
    }
    //console.log(returnArray);
    return returnArray;
}

//builds titles on the calendar
function buildCalendarHeader() {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var add = "<thead>";
    add += "<tr>";

    add += "<th>Month</th>";
    for (var i = 0; i < days.length; i++) {
        add += "<th colspan=\"2\">";
        add += days[i];
        add += "</th>";
    }

    add += "</tr>";
    add += "</thead>"

    $('#monthCalendar').append(add);
}

function getCorrectYear() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    if (month < 8) 
    {
        var yearInt = parseInt(year);
        yearInt--;
        year = yearInt.toString();
    }


    return year;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(setUpHomePage);