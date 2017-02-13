function buildRateScheduleTable()
{
    var rateScheduleTable = document.getElementById("rateScheduleTable");
    var newCell = newRow.insertCell(0);

    for (var i = 0; i < numRows; i++)
    {
        var newRow = rateScheduleTable.insertRow(i + 1);
        newRow.insertCell(0).innerHTML = !!!NAME!!!;
        for (var j = 0; j < 5; j++)
        {
            dayCell = newRow.insertCell(j + 1);
            var day = !!!DAY!!!;
            if (day == "full") {
                dayCell.innerHTML = "F";
            }
            else if (day == "half") {
                dayCell.innerHTML = "H";
            }
            else if (day == "none") {
                dayCell.innerHTML = " ";
            }
        }
        newRow.insertCell(6).innerHTML = !!!StartDate!!!
        newRow.insertCell(7).innerHTML = !!!EndDate!!!
    }
}