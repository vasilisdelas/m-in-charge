const router = require("express").Router();
const Marker = require("../models/Marker");

// POST --- Create a marker

router.post('/', async (req, res) => {
 
  const createdMarker = new Marker(req.body);
  try {
    const savedMarker = await createdMarker.save();
    res.status(200).json(savedMarker);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET --- Get all markers

router.get('/', async (req, res) => {
  try {
    const markers = await Marker.find()
    res.status(200).json(markers)
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE --- Delete a marker

router.delete('/:id', async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.id)
    try {
      await marker.delete()
      res.status(200).json('Marker has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router