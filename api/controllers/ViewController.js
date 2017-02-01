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
  }
};
