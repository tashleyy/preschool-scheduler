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

  'student': function(req, res) {
    res.view('student');
  }
};
