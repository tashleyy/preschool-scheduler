/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

const GoogleAuth = require('google-auth-library');

const auth = new GoogleAuth();

module.exports = function (req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.cookies.gauth) {
    const client = new auth.OAuth2(sails.config.keys.CLIENT_ID, '', '');
    client.verifyIdToken(
      req.cookies.gauth,
      sails.config.keys.CLIENT_ID,
      (error) => {
        if (error) {
          res.clearCookie('gauth');
          return res.serverError();
        }
        res.cookie('gauth', req.cookies.gauth, { maxAge: 86400000 });
        return next();
      } // eslint-disable-line comma-dangle
    );
  } else {
    return res.redirect('/login');
  }
};
