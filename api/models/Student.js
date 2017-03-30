module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    birthday: {
      type: 'string',
      required: true,
    },
    parent1: {
      type: 'string',
      required: true,
    },
    parent2: {
      type: 'string',
    },
    parentPhone1: {
      type: 'string',
      required: true,
    },
    parentPhone2: {
      type: 'string',
    },
    physician: {
      type: 'string',
      required: true,
    },
    physicianPhone: {
      type: 'string',
      required: true,
    },
    timePeriods: {
      collection: 'TimePeriod',
      via: 'student',
      dominant: true,
    },
  },
};
