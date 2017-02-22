function formatDay(day) {
    if (day === 'full') {
        return 'F';
    }
    else if (day === 'half') {
        return 'H';
    }
    return ' ';
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
