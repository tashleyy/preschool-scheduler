module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    monday: {
      type: 'boolean',
      defaultsTo: false,
    },
    tuesday: {
      type: 'boolean',
      defaultsTo: false,
    },
    wednesday: {
      type: 'boolean',
      defaultsTo: false,
    },
    thursday: {
      type: 'boolean',
      defaultsTo: false,
    },
    friday: {
      type: 'boolean',
      defaultsTo: false,
    },
    cost: {
      type: 'float',
      defaultsTo: 0,
    },
    timePeriods: {
      collection: 'TimePeriod',
      via: 'afterSchoolActivities',
    },
  },
};
