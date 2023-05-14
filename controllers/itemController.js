const itemModel = require("../models/itemModels");

// @desc Get All Items
// @route GET /api/items/get-item
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

// @desc Create New Item
// @route POST /api/items/add-item
const addItemController = async (req, res) => {
  const itemId = req.params.itemId;
  const newItem = new itemModel(req.body);
  try {
    const savedItem = await newItem.save()
    try {
      await itemModel.findOneAndUpdate(itemId, {
        $push: {item: savedItem._id}
      })
    } catch (error) {
      console.log(error)
    }
    res.status(200).json(savedItem)
  } catch (error) {
    console.log(error)
  }
};

// @desc Update One Item
// @route PUT /api/items/edit-item/id
const editItemController = async (req, res) => {
  try {
    const updateItem = await itemModel.findOneAndUpdate({_id:req.params.id}, { $set: req.body}, {new: true})
    res.status(200).json(updateItem)
  } catch (error) {
    console.log(error)
  }
};

module.exports = { getItemController, addItemController, editItemController };