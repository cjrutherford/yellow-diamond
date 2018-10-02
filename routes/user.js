const router = require("express").Rotuer();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const log = require("../logger");
const secret = "kajs;igh aoiwn;oiqn;owvba;oubebfsinva;n";

const passport = require("passport");
const jwt = require("jsonwebtoken");

//ROUTE POST REGISTER
router.post("/register", (req, res) => {
  const { errors, isValid } = require("../validation/user").registerUser(
    req.body
  );
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

//ROTUER POST LOGIN
router.post("/login", (req, res) => {
  const { errors, isValid } = require("../validation/user").loginUser(req.body);
  if (!isValid) {
    return res.status(400).json(err);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "No Account Found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.userName
        };
        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err });
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        errors.password = "Password is incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(404).json({ error: "User Not Found." });
        }
        res.json(user);
      })
      .catch(err => res.status(400).json(err));
  }
);
