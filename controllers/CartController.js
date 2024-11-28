import Cart from "../models/CartModel.js";
import asyncHandler from "express-async-handler";

// @desc- read user cart
// @route-GET/api/cart/:user
// @access- public
const getUserCart = asyncHandler(async (req,res,next)=>{
  try {
    const {user} = req.params;
    const result = await Cart.findOne({user});
    res.status(200).send(result);
  } catch (error) {
    next(error);  
  }
})

// @desc- create user cart
// @route-POST/api/cart/:user
// @access- public
const createUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    console.log("car",user);
    const result = await Cart.create({ user, items: [] });
    console.log('res',result);
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});

// @desc- add items in user cart
// @route-PUT/api/cart/:user
// @access- public
const addCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const {single_project}  = req.body.single_project;
console.log("usssss",user,single_project,single_project._id);
    // Ensure single_project has an _id
    if (!single_project || !single_project._id) {
      throw new Error("Invalid project data");
    }

    // Check if the item already exists
    const existItem = await Cart.updateOne(
      { user, "items._id": single_project._id },
      { $set: { "items.$": single_project } } // Update the existing item if it exists
    );

    if (existItem.matchedCount === 0) {
      // Add the new item if it doesn't exist
      const result = await Cart.updateOne(
        { user },
        { $push: { items: single_project } }
      );
      if (result.modifiedCount === 0) throw new Error("Item not added to cart");
    }

    const data = await Cart.findOne({ user });
    console.log("dataaaa",data);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
});



// @desc- delete item in user cart
// @route- DELETE/api/cart/:user/:_id
// @access- public
const deleteCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user, _id } = req.params;
    const result = await Cart.updateOne(
      { user },
      { $pull: { "items": {_id }} }
    );
    if(result.deleteCount===0)throw new Error("item not deleted in cart");
    let data= await Cart.findOne({user});
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const clearCart = asyncHandler(async(req,res,next)=>{
  try {
    const {user} = req.params;
    const result = await Cart.updateOne({user},{$set: {items:[]}},{new:true});
    res.status(200).send(result);
  } catch (error) {
    next(error)
  }
})


export {createUserCart,addCartItem,deleteCartItem,getUserCart,clearCart};