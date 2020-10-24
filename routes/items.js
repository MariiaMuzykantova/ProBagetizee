const express = require('express')
const router = express.Router()

// This is an example file (route) which handles calls to the "/api/items" url.

// Item model
const Item = require('../models/Item')

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .then( items => res.json(items))
})

// @route POST api/items
// @desc post new item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item))
})

// @route DELETE api/items
// @desc delete item by id
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
        .then(() => res.json({message: "item removed"})))
        .catch(error => res.status(404).json({message: "item not found", error: error}))
})

module.exports = router