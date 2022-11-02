const router = require("express").Router();
const Pin = require("../models/Pin");
const DraftPin = require("../models/DraftPin");
const DraftPinRemove = require("../models/DraftRemovePin");
const mongodb = require('mongodb');

// Create A Pin
router.post("/", async (req, res) => {
    try {
        const newPin = new Pin(req.body);
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch(err) {
        res.status(500).json(err);
    }
})

// Get All Pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Remove A Pin
router.post("/remove", async (req, res) => {
    try {
        const _id = req.body._id;
        const del_res = await Pin.deleteOne({"_id": _id});
        res.status(200).json(del_res);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Post to create new draft pin
router.post("/request", async (req, res) => {
    try {
        const requestPin = new DraftPin(req.body);
        const savedPin = await requestPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Get to retrieve all draft pins
router.get("/request", async (req, res) => {
    try {
        const draft_pins = await DraftPin.find();
        res.status(200).json(draft_pins);
    } catch (err) {
        res.status(400).json(err);
    }
})

// remove a draft pin
router.post("/requestremove", async (req, res) => {
    try {
        const _id = req.body._id;
        const del_res = await DraftPin.deleteOne({"_id": _id});
        res.status(200).json(del_res);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/request/remove", async (req, res) => {
    try {
        const remove_pins = await DraftPinRemove.find();
        res.status(200).json(remove_pins);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/request/remove", async (req, res) => {
    try {
        const requestPin = new DraftPinRemove(req.body);
        const savedPin = await requestPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/request/removerequest", async (req, res) => {
    try {
        const id = req.body._id;
        const del_result = await DraftPinRemove.deleteOne({"_id": id});
        res.status(200).json(del_result);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/request/removepin", async (req, res) => {
    try {
        const id = req.body._id;
        const del_result = await Pin.deleteOne({"_id": mongodb.ObjectId(id)});
        res.status(200).json(del_result);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;    