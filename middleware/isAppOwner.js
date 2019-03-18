const User = require('../models/user');
const Application = require('../models/application');

module.exports = (req,res,next) => {
    console.dir(req.params);
    User.findById(req.params.userId).then(u => {
        if(!u) res.status(400).json({message: 'User Not Found in Database, Cannot verify user is admin.'});
        if(user.apps.indexOf(req.params.appId) !== -1){
            next();

        } else {
            Application.findById(req.params.appId).then(app =>{
                if(!app) res.status(500).json({message: 'application not found in database.'});
                if(app.ownerDelegates.indexOf(req.params.userId) !== -1){
                    next();
                } else {
                    res.status(403).json({message: 'User is not Authorized to Administer This App'});
                }
            }).catch(err => res.status(500).json(err));
        }
    }).catch(err => res.status(500).json(err));
}