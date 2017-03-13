module.exports = {
  'create': function (req, res) {
    var params = req.params.all();
    if (!params.startDate || !params.endDate || !params.rateSchedule || !params.student) {
      return res.badRequest();
    }

    RateSchedule.findOne({id: params.rateSchedule}).exec(function(err, rs) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!rs) {
        return res.notFound();
      }
      if (params.afterSchoolActivities && params.afterSchoolActivities.length > 0) {
        AfterSchoolActivity.find({id: params.afterSchoolActivities[0]})
          .exec(function(err2, asa) {
          if (err2) {
            sails.log.error(err2);
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
          }).exec(function timePeriodCreated(err, timePeriod) {
            if (err) {
              sails.log.error(err);
              return res.serverError();
            }
            return res.ok(timePeriod);
          });
        });
      } else {
        TimePeriod.create({
          startDate: params.startDate,
          endDate: params.endDate,
          student: params.student,
          rateSchedule: params.rateSchedule
        }).exec(function timePeriodCreated(err2, timePeriod) {
          if (err2) {
            sails.log.error(err2);
            return res.serverError();
          }
          return res.ok(timePeriod);
        });
      }
    });
  },

  'find': function (req, res) {
    TimePeriod.find()
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