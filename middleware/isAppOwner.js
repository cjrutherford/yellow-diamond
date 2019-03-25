const User = require('../models/user');
const Application = require('../models/application').Application;

module.exports = (req, res, next) => {
  console.dir(req.user);
  User.findById(req.user.id)
    .then(u => {
      if (!u)
        res.status(400).json({
          message: 'User Not Found in Database, Cannot verify user is admin.',
        });
      if (u.apps.indexOf(req.params.applicationId) !== -1) {
        next();
      } else {
        Application.findById(req.params.applicationId)
          .then(app => {
            if (!app)
              res
                .status(500)
                .json({ message: 'application not found in database.' });
            if (app.ownerDelegates.indexOf(req.params.userId) !== -1) {
              next();
            } else if (app.appOwner.equals(req.user.id)) {
              next();
            } else {
              res.status(403).json({
                message: 'User is not Authorized to Administer This App',
              });
            }
          })
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
};
