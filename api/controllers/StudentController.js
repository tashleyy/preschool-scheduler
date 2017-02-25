module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.birthday || !params.rsId
      || !params.parent1 || !params.parentPhone1 || !params.physician
      || !params.physicianPhone || !params.startDate || !params.endDate) {
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
        parentPhone1: params.parentPhone1,
        parent2: params.parent2,
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
  },

  'findOne': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    Student.findOne({id: params.id}).populate('rateSchedules').exec(function(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(student);
    });
  },

  'update': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    var id = params.id;
    delete params.id;
    if (params.rateSchedules) {
      params.rateSchedules = [params.rateSchedules];
    }
    Student.update({id: id}, params)
      .exec(function(err, students) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      var student = students[0];
      if (!student) {
        return res.notFound();
      }
      return res.ok(student);
    });
  },

  'destroy': function(req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    Student.destroy({id: params.id}).exec(function(err) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  }
}