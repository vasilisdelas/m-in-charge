const router = require("express").Router();
const User = require("../models/User");

// POST --- Create an user

router.post('/', async (req, res) => {
 
  const createdUser = new User(req.body);
  try {
    const savedUser = await createdUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET --- Get all users

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE --- Delete an user

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