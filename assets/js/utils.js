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