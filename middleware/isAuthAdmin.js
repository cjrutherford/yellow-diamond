const User = require('../models/user');

module.exports = (req,res,next) => {
    User.findById(req.user.id).then(u => {
        if(!u) res.status(400).json({message: 'Auth Admin User not found in Database.'});
        if(u.authAdmin){
            next();
        } else {
            res.status(403).json({message: 'Signed In User is Not an Auth Admin.'});
        }
    }).catch(err => res.status(500).json(err));
}