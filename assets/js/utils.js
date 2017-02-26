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
    if (day === 'checked') {
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

function stringToDate(string) {
    if (string.length < 7) return null;
    return new Date(Date.UTC(Number(string.substring(0, 4)), Number(string.substring(5, 7))));
}

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return year + '-' + (month > 9 ? '' : '0') + month;
}

function getRateScheduleString(rs) {
    var string = '';
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    for (var i = 0; i < days.length; i++) {
        var day = getRateScheduleDayString(days[i].charAt(0).toUpperCase(), rs[days[i]]);
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