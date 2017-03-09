module.exports = {
  'login': function(req, res) {
    res.view('login');
  },

  'students': function(req, res) {
    res.view('students');
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
    res.view('rateschedules');
  },

  'afterschoolactivities': function(req, res) {
    res.view('afterschoolactivities');
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
      res.view('addtimeperiod', {student: student});
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
