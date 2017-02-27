function setUpHomePage() {
    var year = getParameterByName('year');
    if (year == null)
    {
        year = getCorrectYear();
    }
    var yearInt = parseInt(year);
    var yearNext = yearInt + 1;
    var yearPrev = yearInt - 1;
    var yearTwoNext = yearNext + 1;

    $('#yearHeader').append(year + "/" + yearNext.toString());
    $('#previousYearButton').append("<a href=\"?year=" + yearPrev.toString() + "\">" +
        "<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>" +
        yearPrev.toString() + "/" + year + "</a>");
    $('#nextYearButton').append("<a href=\"?year=" + yearNext + "\">" + yearNext.toString() 
    + "/" + yearTwoNext.toString() + 
    "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>" +
         "</a>");
    displayStudentsOnCalendar();
}

function displayStudentsOnCalendar() {
    buildCalendarHeader();
    var add = "<tbody align=\"left\">";

    add += "<tr>";
    add += "<td></td>";
    for (var i = 0; i < 5; i++) {
        add += "<th>AM</th>";
        add += "<th>PM</th>";
    }
    add += "</tr>";

    $('#monthCalendar').append(add);

    var yearString = getParameterByName('year');
    if (yearString == null)
    {
        yearString = getCorrectYear();
    }
    var year = parseInt(yearString);
    populateArrayForYear(year); 
}

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
                add += "<td>";
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

function populateWithSuccessfulRateSchedule(students, year) {
    var monthToIndex = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3];
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
    var earliestApplicableDate = new MonthAndYear(year, 8);
    var latestApplicableDate = new MonthAndYear(year + 1, 7);
    
    for (var i = 0; i < students.length; i++) {
        var currStudent = students[i];
        var rateSchedule = students[i].rateSchedules[0];
        
        var studentStartDate = MonthAndYear.makeFromString(currStudent.startDate);
        var rateScheduleStartDate = MonthAndYear.makeFromString(rateSchedule.startMonth);
        var startDate = MonthAndYear.getCopyOfLargest(studentStartDate, rateScheduleStartDate);
        
        //console.log("StudentStartDate:" + studentStartDate.toString());
        //console.log("RateScheduleEndDate:" + studentStartDate.toString());

        var studentEndDate = MonthAndYear.makeFromString(currStudent.endDate);
        var rateScheduleEndDate = MonthAndYear.makeFromString(rateSchedule.endMonth);
        var endDate = MonthAndYear.getCopyOfSmallest(rateScheduleEndDate, studentEndDate);

        //console.log("StartDate:" + startDate.toString());
        //console.log("EndDate:" + endDate.toString());
        //console.log("earliestPossibleDate:" + earliestApplicableDate.toString());
        //console.log("latestPossibleDate:" + latestApplicableDate.toString());
        

        if (!(MonthAndYear.lessThan(endDate, earliestApplicableDate)) && !MonthAndYear.lessThan(latestApplicableDate, startDate)) {
            
            var actualStart = MonthAndYear.getCopyOfLargest(startDate, earliestApplicableDate);
            var actualEnd = MonthAndYear.getCopyOfSmallest(latestApplicableDate, endDate);
            //console.log("We are displaying " + currStudent.name);
            //console.log("actual start day:" + actualStart.toString());
            //console.log("actual end day:" + actualEnd.toString());
            
            var currDate = actualStart;
            
            while (!MonthAndYear.lessThan(actualEnd, currDate)) {
                //console.log("CurrentDate: " + currDate.toString());
                //console.log("actualEnd" + actualEnd.toString());

                var monthArray = makeSmallArray(rateSchedule.monday);
                months[monthToIndex[currDate.getMonth()]][0][0] += monthArray[0];
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
            //console.log("end of loop!");
        } else {
                console.log("We not are displaying " + currStudent.name);
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