module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        days: {
            type: 'string[7]',
            enum:['Half', 'Full', 'None'],
            defaultsTo:'None',
            required: false
        },
        cost: {
            type: 'int',
            required: false
        },
        startMonth: {
            type: 'date',
            required: false
        },
        endMonth: {
            type: 'date',
            required: false
        }
    }
};