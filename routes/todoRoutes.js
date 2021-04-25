const express = require("express");
const todoModel = require("../models/todo");
const router = express.Router();

// read all items
router.get("/todos", async (req, res) => {
  const todoItems = await todoModel.find({});

  try {
    res.send(todoItems);
  } catch (err) {
    res.status(500).send(err);
  }
});

// read an item
router.get("/todo/:id",async (req, res) =>{
    try {
        const todoItem = await todoModel.findById(req.params.id)
        await res.json(todoItem)
        if(todoItem != req.params.id){
            res.send({message: "cannot find todo item"})
        }
    } catch (err) {
        res.status(500).send({message:err.message})
        
    }
    
})

// create an item

router.post("/todo", async (req, res) => {
    const todoItem = new todoModel(req.body);
    try {
      await todoItem.save();
      res.send(todoItem);
    } catch (err) {
      res.status(500).send(err);
    }
});
  

// update an item


router.patch("/todo/:id", async (req, res) => {
    try {
     const todoItem = await todoModel.findByIdAndUpdate(req.params.id, req.body);
     const updatedTodo = await todoItem.save()
     res.json(updatedTodo);
    } catch (err) {
      res.status(500).send(err);
    }
});

// delete one item

router.delete("/todo/:id", async (req, res) => {
    try {
      const todoItem = await todoModel.findByIdAndDelete(req.params.id);
      res.send({message: "deleted the todo item"})
  
      if (!todoItem) res.status(404).send("No item found");
      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

module.exports = router