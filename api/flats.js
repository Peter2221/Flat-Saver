const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { body, validationResult } = require('express-validator');

const Flat = require('../models/Flat');

const router = express.Router();

// @route GET api/v1/flats
// @desc get all flats for user
// @access private
router.get('/', verifyToken, async (req, res) => {
  // Get user id
  const userId = req.user.id;
  try {
    // Find all flats with this userId
    const flats = await Flat.find({ user: userId }).sort({ date: -1});
    res.json(flats);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/v1/flats
// @desc get flat by id
// @access private
router.get('/:id', verifyToken, async (req, res) => {
  // Get flat id
  const flatId = req.params.id;
  try {
    // Find all flats with this userId
    const flat = await Flat.findById(flatId);
    if(!flat) {
      return res.status(404).json({ msg: "Flat not found" });
    }

    res.json(flat);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/v1/flats
// @desc add a new flat
// @access private
router.post('/', [
  verifyToken,
  [
    body('flatname', "Flat name is required").not().isEmpty()
  ]
], async (req, res) => {
  // Check errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Get all data from req
  const userId = req.user.id;
  const { flatname, url, price, address, description } = req.body;

  try {
    // Create obj and save it
    const newFlat = new Flat({
      flatname,
      url,
      price,
      address,
      description,
      user: userId
    });

    const flat = await newFlat.save();
    res.json(flat);

  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/v1/flats
// @desc update a flat
// @access private
router.put('/:id', verifyToken, async (req, res) => {
  // Get data
  const { flatname, url, price, address, description } = req.body;
  const flatId = req.params.id;
  
  const flatToUpdate = {};
  if(flatname) flatToUpdate.flatname = flatname;
  if(url) flatToUpdate.url = url;
  if(price) flatToUpdate.price = price;
  if(address) flatToUpdate.address = address;
  if(description) flatToUpdate.description = description;

  try {
    let flat = await Flat.findById(flatId);

    if(!flat) {
      return res.status(404).json({ msg: "Flat not found" });
    }

    // Check if user owns flat 
    if(flat.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Find flat by id and update it
    flat = await Flat.findByIdAndUpdate(flatId, 
      { $set: flatToUpdate },
      { new: true });

    // return updated contact
    res.json(flat);

  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/v1/flats
// @desc delete a flat
// @access private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const flatId = req.params.id;
    // Find flat by id
    let flat = await Flat.findById(flatId);
    console.log(flat);
    if(!flat) {
      return res.status(404).json({ msg: "Flat not found" });
    }

    // Check if user owns flat 
    if(flat.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete flat
    await Flat.findByIdAndRemove(flatId);

    // Return message
    res.json({ msg: "Flat removed" });

  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;