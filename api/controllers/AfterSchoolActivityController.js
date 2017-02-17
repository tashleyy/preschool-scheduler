module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.cost) {
      return res.badRequest();
    }
    RateSchedule.create({
      name: params.name, 
      cost: params.cost,
    }).exec(function AfterSchoolActivityCreated(err, AfterSchoolActivity) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(AfterSchoolActivity);
    });
  },

  'find': function(req, res) {
    AfterSchoolActivity.find().exec(function(err, AfterschoolActivity) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(AfterSchoolActivities);
    })
  }
}