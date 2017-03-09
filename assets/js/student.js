
function setUpTimePeriodButton() {
    //creates navigation buttons at the bottom of the window

    $("#addstudentschedulebutton").append("<button type=\"button\"" + 
        "onClick = \"goToAddTimePeriodPage()\">Add Time Period</button>");
}

function goToAddTimePeriodPage() {
    var studentId = window.location.href.split("/").pop();
    
    window.location.pathname = "/addtimeperiod/" + studentId;
}

$(document).ready(setUpTimePeriodButton);