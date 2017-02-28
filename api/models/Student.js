module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        birthday: {
            type: 'string',
            required: true
        },
        parent1: {
            type: 'string',
            required: true
        },
        parent2: {
            type: 'string'
        },
        parentPhone1: {
            type: 'string',
            required: true
        },
        parentPhone2: {
            type: 'string'
        },
        physician: {
            type: 'string',
            required: true
        },
        physicianPhone: {
            type: 'string',
            required: true
        },
        startDate: {
            type: 'string',
            required: true
        },
        endDate: {
            type: 'string',
            required: true
        },
        rateSchedules: {
            collection: 'RateSchedule',
            via: 'students',
            required: true,
            dominant: true
        },
        afterSchoolActivities: {
            collection: 'AfterSchoolActivity',
            via: 'students',
            dominant: true
        }
    }
};