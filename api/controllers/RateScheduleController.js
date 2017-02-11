module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name) {
      return res.badRequest();
    }
    RateSchedule.create({name: params.name}, function rateScheduleCreated(err, rateSchedule) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(rateSchedule);
    });
  }
}