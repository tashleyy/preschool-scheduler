var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();

module.exports = {
  'login': function(req, res) {
    req.session.authenticated = true;
    return res.ok()
  },

  'logout': function(req, res) {
    req.session.authenticated = false;
    return res.ok();
  }
};
