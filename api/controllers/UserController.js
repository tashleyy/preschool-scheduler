const GoogleAuth = require('google-auth-library');

const auth = new GoogleAuth();

module.exports = {
  login(req, res) {
    const params = req.params.all();
    const token = params.token;
    const client = new auth.OAuth2(sails.config.keys.CLIENT_ID, '', '');
    client.verifyIdToken(
      token,
      sails.config.keys.CLIENT_ID,
      (error, login) => {
        if (error) {
          return res.serverError();
        }
        const payload = login.getPayload();
        const email = payload.email;
        User.findOne({ email }).exec((error2, user) => {
          if (error2) {
            return res.serverError();
          }
          if (!user) {
            return res.forbidden();
          }
          res.cookie('gauth', token, { maxAge: 86400000 });
          return res.ok();
        });
      } // eslint-disable-line comma-dangle
    );
  },

  logout(req, res) {
    res.clearCookie('gauth');
    return res.ok();
  },
};
