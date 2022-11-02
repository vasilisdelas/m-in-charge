
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Register User
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const usr = await User.findOne({ username: req.body.username });
        if (usr) res.status(419).json("User Already Exists");
        const email = await User.findOne({ email_address: req.body.email_address });
        if (email) res.status(419).json("User Already Exists");
        const newUser = new User({
            username: req.body.username,
            email_address: req.body.email_address,
            password: hashedPassword,
            role: req.body.role
        });
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        // Find User
        const user = await User.findOne({ username: req.body.username });
        if (!user) res.status(400).json("Wrong username or password!");
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    res.status(200).json("Login");    
                } else {
                    res.status(400).json("Wrong username or password!")
                }
            });
        }
    } catch(err) {
        res.status(500).json(err);
    }
}) 

router.post('/getrole', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }); 
        if (!user) res.status(400).json(`No username ${req.body.username} was found.`);
        else {
            res.status(200).json(user.role);
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;    