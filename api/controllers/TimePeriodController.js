module.exports = {
  'create': function (req, res) {
    var params = req.params.all();
    if (!params.startDate || !params.endDate || !params.rateSchedule || !params.student) {
      return res.badRequest();
    }
    
    Student.findOne({id: params.student}).exec(function(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
      }
      RateSchedule.findOne({id: params.rateSchedule}).exec(function(err2, rs) {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        if (!rs) {
          return res.notFound();
        }
        if (params.afterSchoolActivities && params.afterSchoolActivities.length > 0) {
          AfterSchoolActivity.find({id: params.afterSchoolActivities[0]})
            .exec(function(err3, asa) {
            if (err3) {
              sails.log.error(err3);
              return res.serverError();
            }
            if (!asa) {
              return res.notFound();
            }
            TimePeriod.create({
              startDate: params.startDate,
              endDate: params.endDate,
              student: params.student,
              rateSchedule: params.rateSchedule,
              afterSchoolActivities: params.afterSchoolActivities[0]
            }).exec(function timePeriodCreated(err4, timePeriod) {
              if (err4) {
                sails.log.error(err4);
                return res.serverError();
              }
              student.timePeriods.push(timePeriod);
              student.save();
              return res.ok(timePeriod);
            });
          });
        } else {
          TimePeriod.create({
            startDate: params.startDate,
            endDate: params.endDate,
            student: params.student,
            rateSchedule: params.rateSchedule
          }).exec(function timePeriodCreated(err3, timePeriod) {
            if (err3) {
              sails.log.error(err3);
              return res.serverError();
            }
            student.timePeriods.push(timePeriod);
            student.save();
            return res.ok(timePeriod);
          });
        }
      });
    });
  },

  'find': function (req, res) {
    var params = req.params.all();
    var criteria = {};
    if (params.student) {
      criteria.student = params.student;
    }
    TimePeriod.find(criteria)
      .populate('student')
      .populate('rateSchedule')
      .populate('afterSchoolActivities')
      .exec(function(err, timePeriods) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(timePeriods);
    });
  },

  'findOne': function (req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    TimePeriod.findOne({id: params.id})
      .populate('rateSchedule')
      .populate('afterSchoolActivities')
      .exec(function(err, timePeriod) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok(timePeriod);
    });
  },

  'update': function (req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    var id = params.id;
    delete params.id;
    TimePeriod.update({id: id}, params)
      .exec(function(err, timePeriods) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      var timePeriod = timePeriods[0];
      if (!timePeriod) {
        return res.notFound();
      }
      return res.ok(timePeriod);
    });
  },

  'destroy': function (req, res) {
    var params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    TimePeriod.destroy({id: params.id}).exec(function(err) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  }
}