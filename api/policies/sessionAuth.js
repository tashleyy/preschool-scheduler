/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.cookies.gauth) {
    var client = new auth.OAuth2(sails.config.keys.CLIENT_ID, '', '');
    client.verifyIdToken(
      req.cookies.gauth,
      sails.config.keys.CLIENT_ID,
      function(error, login) {
        if (error) {
          res.clearCookie('gauth');
          return res.serverError();
        }
        var payload = login.getPayload();
        var email = payload.email;
        res.cookie('gauth', req.cookies.gauth, {maxAge: 86400000});
        return next();
      }
    );
  } else {
    return res.redirect('/login');
  }
};
