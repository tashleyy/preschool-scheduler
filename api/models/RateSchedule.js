module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    monday: {
      type: 'string',
      enum: ['am', 'pm', 'full', 'none'],
      defaultsTo: 'none',
    },
    tuesday: {
      type: 'string',
      enum: ['am', 'pm', 'full', 'none'],
      defaultsTo: 'none',
    },
    wednesday: {
      type: 'string',
      enum: ['am', 'pm', 'full', 'none'],
      defaultsTo: 'none',
    },
    thursday: {
      type: 'string',
      enum: ['am', 'pm', 'full', 'none'],
      defaultsTo: 'none',
    },
    friday: {
      type: 'string',
      enum: ['am', 'pm', 'full', 'none'],
      defaultsTo: 'none',
    },
    cost: {
      type: 'float',
      defaultsTo: 0,
    },
    timePeriods: {
      collection: 'TimePeriod',
      via: 'rateSchedule',
    },
  },
};
