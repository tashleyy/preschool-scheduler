module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        phone: {
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
            type: 'string',
        }
    }
};