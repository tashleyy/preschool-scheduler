module.exports = {
  attributes: {
    startDate: {
      type: 'string',
      required: true,
    },
    endDate: {
      type: 'string',
      required: true,
    },
    rateSchedule: {
      model: 'RateSchedule',
      via: 'timePeriods',
      required: true,
      dominant: true,
    },
    afterSchoolActivities: {
      collection: 'AfterSchoolActivity',
      via: 'timePeriods',
      dominant: true,
    },
    student: {
      model: 'Student',
      via: 'timePeriods',
      required: true,
    },
  },
};
