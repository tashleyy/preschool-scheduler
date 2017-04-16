module.exports = {
  create(req, res) {
    const params = req.params.all();
    if (!params.startDate || !params.endDate || !params.rateSchedule || !params.student) {
      return res.badRequest();
    }

    Student.findOne({ id: params.student }).populate('timePeriods').exec((err, student) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
      }

      const newPeriodStartDate = new Date(params.startDate);
      const newPeriodEndDate = new Date(params.endDate);
      if (newPeriodEndDate < newPeriodStartDate) {
        return res.ok('misordered');
      }

      let inputOK = true;
      if ((student != null) && (student.timePeriods != null)) {
        for (let i = 0; i < student.timePeriods.length; i++) {
          const timePeriod = student.timePeriods[i];
          const oldPeriodStartDate = new Date(timePeriod.startDate);
          const oldPeriodEndDate = new Date(timePeriod.endDate);
          const endsBefore = (oldPeriodEndDate < newPeriodStartDate);
          const beginsAfter = (oldPeriodStartDate > newPeriodEndDate);
          inputOK = inputOK && (endsBefore || beginsAfter);
        }
      }

      if (!inputOK) {
        return res.ok('overlap');
      }

      RateSchedule.findOne({ id: params.rateSchedule }).exec((err2, rs) => {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        if (!rs) {
          return res.notFound();
        }
        if (params.afterSchoolActivities && params.afterSchoolActivities.length > 0) {
          AfterSchoolActivity.find({ id: params.afterSchoolActivities[0] })
            .exec((err3, asa) => {
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
                afterSchoolActivities: params.afterSchoolActivities,
              }).exec((err4, timePeriod) => {
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
            rateSchedule: params.rateSchedule,
          }).exec((err3, timePeriod) => {
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

  find(req, res) {
    const params = req.params.all();
    const criteria = {};
    if (params.student) {
      criteria.student = params.student;
    }
    TimePeriod.find(criteria)
      .populate('student')
      .populate('rateSchedule')
      .populate('afterSchoolActivities')
      .exec((err, timePeriods) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        return res.ok(timePeriods);
      });
  },

  findOne(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    TimePeriod.findOne({ id: params.id })
      .populate('rateSchedule')
      .populate('afterSchoolActivities')
      .exec((err, timePeriod) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        return res.ok(timePeriod);
      });
  },

  update(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    const id = params.id;
    delete params.id;
    if (params.afterSchoolActivities === '') params.afterSchoolActivities = [];
    TimePeriod.update({ id }, params)
      .exec((err, timePeriods) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!timePeriods || timePeriods.length === 0) {
          return res.notFound();
        }
        const timePeriod = timePeriods[0];
        return res.ok(timePeriod);
      });
  },

  destroy(req, res) {
    const params = req.params.all();
    if (!params.id) {
      return res.badRequest();
    }

    TimePeriod.destroy({ id: params.id }).exec((err) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      return res.ok();
    });
  },
};
