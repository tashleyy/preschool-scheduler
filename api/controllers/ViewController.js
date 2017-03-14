module.exports = {
  'login': function(req, res) {
    res.view('login');
  },

  'students': function(req, res) {
    RateSchedule.find().exec(function(err, rateSchedules) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      var rsMap = {};
      for (var i = 0; i < rateSchedules.length; i++) {
        rsMap[rateSchedules[i].id] = rateSchedules[i];
      }
      Student.find().populate('timePeriods').exec(function(err, students) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }
        var date = dateToString(new Date());
        for (var i = 0; i < students.length; i++) {
          var s = students[i];
          s.timePeriods.sort(function(a, b) {
            if (a.endDate < b.endDate) {
              return -1;
            }
            if (a.endDate > b.endDate) {
              return 1;
            }
            return 0;
          });
          var tp;
          for (var j = 0; j < s.timePeriods.length; j++) {
            if (s.timePeriods[j].endDate > date) {
              if (s.timePeriods[j].startDate <= date) {
                tp = s.timePeriods[j];
              }
              break;
            }
          }
          if (tp) {
            s.timePeriodString = rateScheduleToString(rsMap[tp.rateSchedule]);
          } else {
            s.timePeriodString = '';
          }
          if (i === students.length-1) {
            res.view('students', {students: students});
          }
        }
      });
    });
  },

  'home': function(req, res) {
    res.view('home');
  },

  'addstudent': function(req, res) {
    res.view('addstudent');
  },

  'addrateschedule': function(req, res) {
    res.view('addrateschedule');
  },

  'addafterschoolactivity': function(req, res) {
    res.view('addafterschoolactivity');
  },

  'rateschedules': function(req, res) {
    RateSchedule.find().exec(function(err, rateSchedules) {
      if (err) {
        sails.log.error(err);
        return res.serverError();        
      }
      res.view('rateschedules', {rateSchedules: rateSchedules});
    });
  },

  'afterschoolactivities': function(req, res) {
    AfterSchoolActivity.find().exec(function(err, afterSchoolActivities) {
      if (err) {
        sails.log.error(err);
        return res.serverError();        
      }
      res.view('afterschoolactivities', {afterSchoolActivities: afterSchoolActivities});
    });
  },

  'addtimeperiod': function(req, res) {
    Student.findOne({id: req.params.studentId}).populate('timePeriods')
      .exec(function(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
      }
      RateSchedule.find().exec(function(err2, rateSchedules) {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        AfterSchoolActivity.find().exec(function(err3, afterSchoolActivities) {
          if (err3) {
            sails.log.error(err3);
            return res.serverError();
          }
          res.view('addtimeperiod', {
            student: student,
            rateSchedules: rateSchedules,
            afterSchoolActivities: afterSchoolActivities
          });
        });
      });
    });
  },

  'student': function(req, res) {
    Student.findOne({id: req.params.studentId}).populate('timePeriods')
      .exec(function(err, student) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }
      if (!student) {
        return res.notFound();
      }
      res.view('student', {student: student});
    });
  }
};

function dateToString(obj) {
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var date = obj.getDate();
    return year + '-' + (month > 9 ? '' : '0') + month + '-' + (date > 9 ? '' : '0') + date;
}

function rateScheduleToString(rs) {
    if (!rs) {
        return '';
    }
    var string = '';
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    var letters = ['M', 'T', 'W', 'H', 'F'];
    for (var i = 0; i < days.length; i++) {
        var day = rateScheduleDayToString(letters[i], rs[days[i]]);
        string += day + (day.length > 0 ? ', ' : '');
    }
    if (string.endsWith(", ")) {
        string = string.substring(0, string.length-2);
    }
    return string;
}

function rateScheduleDayToString(day, value) {
    if (value === 'full') {
        return day;
    }
    if (value === 'am' || value === 'pm') {
        return day + ' (' + value.charAt(0).toUpperCase() + ')';
    }
    return '';
}