module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.phone || !params.rsId) {
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
        phone: params.phone,
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