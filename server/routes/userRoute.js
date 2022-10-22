const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// REGISTER ---------------------------------------->

router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user
    const user = await newUser.save();

    // Send response
    res.status(200).json(user.username)
  } catch(err) {
    res.status(500).json(err)
  }
})

// LOG IN ---------------------------------------->

router.post("/login", async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ username: req.body.username })
    if(!user) {
      res.status(400).json("Wrong username or password");
      return;
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validPassword) {
      res.status(400).json("Wrong username or password");
      return;
    }

    // Send response
    res.status(200).json({ _id: user._id, username: user.username })
  } catch(err) {
    res.status(500).json(err)
  }
})

// POST --- Create an user -------------------->

router.post('/', async (req, res) => {
 
  const createdUser = new User(req.body);
  try {
    const savedUser = await createdUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET --- Get all users -------------------->

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE --- Delete an user -------------------->

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    try {
      await user.delete()
      res.status(200).json('User has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router