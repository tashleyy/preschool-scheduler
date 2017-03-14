function formatDay(day) {
    if (day === 'full') {
        return 'F';
    }
    else if (day === 'am') {
        return 'A';
    } else if (day === 'pm') {
        return 'P';
    } else if (day === 'half') { // remove
        return 'H';
    }
    return '';
}

function formatASADay(day) {
    if (day) {
        return 'X';
    }
    return '';
}

function formatCost(cost) {
    if (cost && typeof cost === 'string' && cost.length > 0 && cost[0] !== '$') {
        if (cost[0] === '$') {
            return cost;
        }
        return '$' + cost;
    } else if (cost && typeof cost !== 'string') {
        return '$' + cost.toString();
    }
    return cost;
}

function dateToDateString(obj) {
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var date = obj.getDate();
    return year + '-' + (month > 9 ? '' : '0') + month + '-' + (date > 9 ? '' : '0') + date;
}

function getRateSchedulesString(rateSchedules) {
    if (!rateSchedules || rateSchedules.length === 0) {
        return string;
    }
    return getRateScheduleString(rateSchedules[0]);
}

function getRateScheduleString(rs) {
    if (!rs) {
        return '';
    }
    var string = '';
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    var letters = ['M', 'T', 'W', 'H', 'F'];
    for (var i = 0; i < days.length; i++) {
        var day = getRateScheduleDayString(letters[i], rs[days[i]]);
        string += day + (day.length > 0 ? ', ' : '');
    }
    if (string.endsWith(", ")) {
        string = string.substring(0, string.length-2);
    }
    return string;
}

function getRateScheduleDayString(day, value) {
    if (value === 'full') {
        return day;
    }
    if (value === 'am' || value === 'pm') {
        return day + ' (' + value.charAt(0).toUpperCase() + ')';
    }
    return '';
}

function getTimePeriodString(timePeriods, date) {
    if (!date) {
        date = dateToDateString(new Date());
    }
    timePeriods.sort(function(a, b) {
        if (a.endDate < b.endDate) {
            return -1;
        }
        if (a.endDate > b.endDate) {
            return 1;
        }
        return 0;
    });
    var tp;
    for (var i = 0; i < timePeriods.length; i++) {
        if (timePeriods[i].endDate > date) {
            if (timePeriods[i].startDate <= date) {
                tp = timePeriods[i];
            }
            break;
        }
    }
    if (tp) {
        $.ajax({
            url: '/rateschedule/findone',
            type: 'get',
            data: {
                id: tp.rateSchedule
            },
            success: function(data) {
                return getRateScheduleString(data);
            },
            error: function(xhr, status, error) {
                console.log('error: ' + error);
                return '';
            }
        });
    } else {
        return '';
    }
}