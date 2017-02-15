module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name) {  //TODO: add the rest of the params 
      return res.badRequest();
    }
    RateSchedule.create({
      name: params.name, 
      phone: params.phone,
      ratetSchedule: params.studentSchedule,
      afterSchoolActivities: params.afterSchoolActivities
    }, function studentCreated(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(student);
    });
  }
}