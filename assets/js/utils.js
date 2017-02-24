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
