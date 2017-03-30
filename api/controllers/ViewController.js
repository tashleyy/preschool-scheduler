function dateToString(obj) {
  const year = obj.getFullYear();
  const month = obj.getMonth() + 1;
  return `${year}-${month > 9 ? '' : '0'}${month}`;
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

function isPastTimePeriod(tp) {
  if (!tp) {
    return false;
  }
  const date = dateToString(new Date());
  return tp.endDate.substring(0, 7) < date;
}

function isFutureTimePeriod(tp) {
  if (!tp) {
    return false;
  }
  const date = dateToString(new Date());
  return tp.startDate.substring(0, 7) > date;
}

function isCurrentTimePeriod(tp) {
  if (!tp) {
    return false;
  }
  const date = dateToString(new Date());
  return tp.endDate >= date && tp.startDate <= date;
}

function timePeriodStartDateCompare(a, b) {
  if (a.startDate < b.startDate) {
    return -1;
  } else if (a.startDate > b.startDate) {
    return 1;
  } 
  return 0;
}

function getYear(date) {
  if (date.length < 7) return null;
  return parseInt(date.substring(0, 4), 10);
}

function getMonth(date) {
  if (date.length < 7) return null;
  return parseInt(date.substring(5, 7), 10);
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
      TimePeriod.find().populate('afterSchoolActivities').exec((err2, timePeriods) => {
        if (err2) {
          sails.log.error(err2);
          return res.serverError();
        }
        const tpMap = {};
        for (let i = 0; i < timePeriods.length; i++) {
          tpMap[timePeriods[i].id] = timePeriods[i];
        }
        Student.find().populate('timePeriods').sort('name ASC').exec((err3, students) => {
          if (err3) {
            sails.log.error(err3);
            return res.serverError();
          }
          if (students.length === 0) {
            res.view('students', { students });
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
            if (tp) {
              tp = tpMap[tp.id];
              s.timePeriodString = rateScheduleToString(rsMap[tp.rateSchedule]);
              s.asaString = '';
              for (let j = 0; j < tp.afterSchoolActivities.length; j++) {
                s.asaString += `${tp.afterSchoolActivities[j].name}, `;
              }
              if (s.asaString.endsWith(', ')) {
                s.asaString = s.asaString.substring(0, s.asaString.length - 2);
              }
            } else {
              s.timePeriodString = '';
              s.asaString = '';
            }
            if (i === students.length - 1) {
              res.view('students', { students });
            }
          }
        });
      });
    });
  },

  home(req, res) {
    let year = req.query.year;
    if (year) {
      year = parseInt(year, 10);
    } else {
      const date = new Date();
      year = parseInt(date.getFullYear(), 10);
      if (date.getMonth() < 9) {
        year--;
      }
    }

    TimePeriod.find().populate('rateSchedule').populate('afterSchoolActivities').exec((err, timePeriods) => {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      const NUM_MONTHS = 12;
      const NUM_DAYS = 5;
      const NUM_SESSIONS = 3;
      const monthToIndex = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3];
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      const calendar = new Array(NUM_MONTHS);
      for (let i = 0; i < NUM_MONTHS; i++) {
        calendar[i] = new Array(NUM_DAYS);
        for (let j = 0; j < NUM_DAYS; j++) {
          calendar[i][j] = new Array(NUM_SESSIONS);
          for (let k = 0; k < NUM_SESSIONS; k++) {
            calendar[i][j][k] = 0;
          }
        }
      }

      const earliest = `${year}-09`;
      const latest = `${year + 1}-08`;

      for (let i = 0; i < timePeriods.length; i++) {
        const timePeriod = timePeriods[i];
        const rateSchedule = timePeriod.rateSchedule;
        const afterSchoolActivities = timePeriod.afterSchoolActivities;
        const startDate = timePeriod.startDate.substring(0, 7);
        const endDate = timePeriod.endDate.substring(0, 7);

        const monthArray = new Array(NUM_DAYS);
        for (let j = 0; j < NUM_DAYS; j++) {
          monthArray[j] = [0, 0];
          if (rateSchedule[days[j]] === 'full') {
            monthArray[j][0] = 1;
            monthArray[j][1] = 1;
          } else if (rateSchedule[days[j]] === 'am') {
            monthArray[j][0] = 1;
          } else if (rateSchedule[days[j]] === 'pm') {
            monthArray[j][1] = 1;
          }
        }
        const asaArray = [0, 0, 0, 0, 0];
        for (let j = 0; j < afterSchoolActivities.length; j++) {
          for (let k = 0; k < NUM_DAYS; k++) {
            if (afterSchoolActivities[j][days[k]]) {
              asaArray[k] = 1;
            }
          }
        }

        if (rateSchedule && endDate >= earliest && latest >= startDate) {
          sails.log.debug(startDate, endDate, earliest, latest);
          const actualStart = startDate > earliest ? startDate : earliest;
          const actualEnd = endDate < latest ? endDate : latest;
          let currDate = actualStart;

          while (actualEnd >= currDate) {
            for (let j = 0; j < NUM_DAYS; j++) {
              calendar[monthToIndex[getMonth(currDate) - 1]][j][0] += monthArray[j][0];
              calendar[monthToIndex[getMonth(currDate) - 1]][j][1] += monthArray[j][1];
              calendar[monthToIndex[getMonth(currDate) - 1]][j][2] += asaArray[j];
            }

            if (getMonth(currDate) === 12) {
              currDate = `${getYear(currDate) + 1}-01`;
            } else {
              const month = getMonth(currDate) + 1;
              currDate = `${getYear(currDate)}-${month > 9 ? '' : '0'}${month}`;
            }
          }
        }
      }
      res.view('home', {
        year,
        calendar,
      });
    });
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
          const rsMap = {};
          for (let i = 0; i < rateSchedules.length; i++) {
            rsMap[rateSchedules[i].id] = rateSchedules[i];
          }
          AfterSchoolActivity.find().sort('startDate ASC').exec((err3, afterSchoolActivities) => {
            if (err3) {
              sails.log.error(err3);
              return res.serverError();
            }

            var earliestStartDate = "N/A";
            var latestEndDate = "N/A";

            student.timePeriods.sort(timePeriodStartDateCompare);

            if (student.timePeriods.length != 0)
            {
              earliestStartDate = student.timePeriods[0].startDate;
              latestEndDate = student.timePeriods[student.timePeriods.length - 1].endDate;
            }

            const past = [];
            const current = [];
            const future = [];
            for (let i = 0; i < student.timePeriods.length; i++) {
              const tp = student.timePeriods[i];
              tp.rateSchedule = rsMap[tp.rateSchedule];
              if (isPastTimePeriod(tp)) {
                past.push(tp);
              } else if (isFutureTimePeriod(tp)) {
                future.push(tp);
              } else if (isCurrentTimePeriod(tp)) {
                current.push(tp);
              }
            }

            res.view('student', {
              student,
              rateSchedules,
              afterSchoolActivities,
              past,
              current,
              future,
              earliestStartDate,
              latestEndDate,
            });
          });
        });
      });
  },
};
