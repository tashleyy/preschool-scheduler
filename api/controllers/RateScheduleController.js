module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.cost || !params.monday || !params.tuesday
      || !params.wednesday || !params.thursday || !params.friday
      || !params.startMonth || !params.endMonth) {
      return res.badRequest();
    }
    RateSchedule.create({
      name: params.name, 
      cost: params.cost,
      monday: params.monday,
      tuesday: params.tuesday,
      wednesday: params.wednesday,
      thursday: params.thursday,
      friday: params.friday,
      startMonth: params.startMonth,
      endMonth: params.endMonth
    }, function rateScheduleCreated(err, rateSchedule) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedule);
    });
  },
  'find': function(req, res) {
    RateSchedule.find().exec(function(err, rateSchedules) {
      if (err) {
        return res.serverError();
      }
      return res.ok(rateSchedules);
    })
  }
}