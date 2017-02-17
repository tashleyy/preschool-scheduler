module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    //TODO put all checks in
    if (!params.name || !params.birthday || !params.rsId) {
      return res.badRequest();
    }
    RateSchedule.findOne({id: params.rsId})
      .exec(function(err, rs) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!rs) {
        return res.notFound();
      }
      Student.create({
        name: params.name,
        birthday: params.birthday,
        parent1: params.parent1,
        parentPhone1: params.parentPhone2,
        parentPhone2: params.parentPhone2,
        physician: params.physician,
        physicianPhone: params.physicianPhone,
        startDate: params.startDate,
        endDate: params.endDate,
        rateSchedules: [params.rsId]
      }).exec(function studentCreated(err, student) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        return res.ok(student);
      });
    });
  },

  'find': function(req, res) {
    Student.find().populate('rateSchedules').exec(function(err, students) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(students);
    });
  }
}