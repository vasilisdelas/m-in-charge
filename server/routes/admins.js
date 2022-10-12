const router = require("express").Router();
const Admin = require("../models/Admin");

// POST --- Create an admin

router.post('/', async (req, res) => {
 
  const createdAdmin = new Admin(req.body);
  try {
    const savedAdmin = await createdAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET --- Get all admins

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find()
    res.status(200).json(admins)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE --- Delete an admin

router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
    try {
      await admin.delete()
      res.status(200).json('Admin has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router