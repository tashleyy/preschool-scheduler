function dateToString(obj) {
  const year = obj.getFullYear();
  const month = obj.getMonth() + 1;
  const date = obj.getDate();
  return `${year}-${month > 9 ? '' : '0'}${month}-${date > 9 ? '' : '0'}${date}`;
}

function rateScheduleDayToString(day, value) {
  if (value === 'full') {
    return day;
  }
  if (value === 'am' || value === 'pm') {
    return `${day} (${value.charAt(0).toUpperCase()})`;
  }
  return '';
}

function rateScheduleToString(rs) {
  if (!rs) {
    return '';
  }
  let string = '';
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const letters = ['M', 'T', 'W', 'H', 'F'];
  for (let i = 0; i < days.length; i++) {
    const day = rateScheduleDayToString(letters[i], rs[days[i]]);
    string += day + (day.length > 0 ? ', ' : '');
  }
  if (string.endsWith(', ')) {
    string = string.substring(0, string.length - 2);
  }
  return string;
}

module.exports = {
  login(req, res) {
    res.view('login');
  },

  students(req, res) {
    RateSchedule.find().exec((err, rateSchedules) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      const rsMap = {};
      for (let i = 0; i < rateSchedules.length; i++) {
        rsMap[rateSchedules[i].id] = rateSchedules[i];
      }
      Student.find().populate('timePeriods').exec((err2, students) => {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        const date = dateToString(new Date());
        for (let i = 0; i < students.length; i++) {
          let tp;
          const s = students[i];
          s.timePeriods.sort((a, b) => {
            if (a.endDate < b.endDate) {
              return -1;
            }
            if (a.endDate > b.endDate) {
              return 1;
            }
            return 0;
          });
          for (let j = 0; j < s.timePeriods.length; j++) {
            if (s.timePeriods[j].endDate > date) {
              if (s.timePeriods[j].startDate <= date) {
                tp = s.timePeriods[j];
              }
              break;
            }
          }
          if (tp) {
            s.timePeriodString = rateScheduleToString(rsMap[tp.rateSchedule]);
            /*
            if(tp.afterSchoolActivities)
            {
              for(let k = 0; k<tp.afterSchoolActivities.length; k++)
              {
                s.afterSchoolActivitiesString += tp.afterSchoolActivities[k];
              }
            }
            else
            {
              s.afterSchoolActivitiesString = '';
            }
            */
            s.afterSchoolActivitiesString = "howdy"
            } 
          else {
            s.timePeriodString = '';
            s.afterSchoolActivitiesString = "doody";
          }
          if (i === students.length - 1) {
            res.view('students', { students });
          }
        }
      });
    });
  },

  home(req, res) {
    res.view('home');
  },

  addstudent(req, res) {
    res.view('addstudent');
  },

  addrateschedule(req, res) {
    res.view('addrateschedule');
  },

  addafterschoolactivity(req, res) {
    res.view('addafterschoolactivity');
  },

  rateschedules(req, res) {
    RateSchedule.find().exec((err, rateSchedules) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      res.view('rateschedules', { rateSchedules });
    });
  },

  afterschoolactivities(req, res) {
    AfterSchoolActivity.find().exec((err, afterSchoolActivities) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      res.view('afterschoolactivities', { afterSchoolActivities });
    });
  },

  addtimeperiod(req, res) {
    Student.findOne({ id: req.params.studentId }).populate('timePeriods')
      .exec((err, student) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!student) {
          return res.notFound();
        }
        RateSchedule.find().exec((err2, rateSchedules) => {
          if (err2) {
            sails.log.error(err2);
            return res.serverError();
          }
          AfterSchoolActivity.find().exec((err3, afterSchoolActivities) => {
            if (err3) {
              sails.log.error(err3);
              return res.serverError();
            }
            res.view('addtimeperiod', {
              student,
              rateSchedules,
              afterSchoolActivities,
            });
          });
        });
      });
  },

  student(req, res) {
    Student.findOne({ id: req.params.studentId }).populate('timePeriods')
      .exec((err, student) => {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        if (!student) {
          return res.notFound();
        }
        RateSchedule.find().exec((err2, rateSchedules) => {
          if (err2) {
            sails.log.error(err2);
            return res.serverError();
          }
          AfterSchoolActivity.find().exec((err3, afterSchoolActivities) => {
            if (err3) {
              sails.log.error(err3);
              return res.serverError();
            }
            res.view('student', {
              student,
              rateSchedules,
              afterSchoolActivities,
            });
          });
        });
      });
  },
};
