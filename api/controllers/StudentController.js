module.exports = {
  'create': function(req, res) {
    var params = req.params.all();
    if (!params.name || !params.birthday || !params.parent1 || !params.parentPhone1 
    || !params.physician || !params.physicianPhone || !params.startDate || !params.endDate) {
      return res.badRequest();
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
    }).exec(function studentCreated(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(student);
    });
  },

  'find': function(req, res) {    
    Student.find().populate('timePeriods').exec(function(err, students) {
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

    Student.findOne({id: params.id}).populate('timePeriods').exec(function(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
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