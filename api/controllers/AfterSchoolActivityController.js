module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.cost) {
      return res.badRequest();
    }
    AfterSchoolActivity.create({
      name: params.name, 
      cost: params.cost
    }).exec(function afterSchoolActivityCreated(err, afterSchoolActivity) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivity);
    });
  },

  'find': function(req, res) {
    AfterSchoolActivity.find().exec(function(err, afterSchoolActivities) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(afterSchoolActivities);
    })
  }
}