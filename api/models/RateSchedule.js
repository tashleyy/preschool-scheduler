module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        monday: {
            type: 'string',
            enum: ['half', 'full', 'none'],
            defaultsTo: 'None'
        },
        tuesday: {
            type: 'string',
            enum: ['half', 'full', 'none'],
            defaultsTo: 'None'
        },
        wednesday: {
            type: 'string',
            enum: ['half', 'full', 'none'],
            defaultsTo: 'None'
        },
        thursday: {
            type: 'string',
            enum: ['half', 'full', 'none'],
            defaultsTo: 'None'
        },
        friday: {
            type: 'string',
            enum: ['half', 'full', 'none'],
            defaultsTo: 'None'
        },
        cost: {
            type: 'float',
            defaultsTo: 0
        },
        startMonth: {
            type: 'string',
            required: true
        },
        endMonth: {
            type: 'string',
            required: true
        },
        students: {
            collection: 'Student',
            via: 'rateSchedules'
        }
    }
};