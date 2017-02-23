var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();

module.exports = {
  'login': function(req, res) {
    var params = req.params.all();
    var token = params.token;
    var client = new auth.OAuth2(sails.config.keys.CLIENT_ID, '', '');
    client.verifyIdToken(
      token,
      sails.config.keys.CLIENT_ID,
      function(error, login) {
        if (error) {
          return res.serverError();
        }
        var payload = login.getPayload();
        var email = payload.email;
        res.cookie('gauth', token, {maxAge: 86400000});
        return res.ok();
        // User.findOne({email: email}).exec(function userFound(error, user) {
        //   if (error) {
        //     req.session.authenticated = false;
        //     return res.serverError();
        //   }
        //   if (!user) {
        //     req.session.authenticated = false;
        //     return res.forbidden();
        //   }
        //   req.session.authenticated = true;
        //   return res.ok();
        // });
      }
    );
  },

  'logout': function(req, res) {
    // req.session.authenticated = false;
    res.clearCookie('gauth');
    return res.ok();
  }
};
