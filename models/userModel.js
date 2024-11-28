import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role:{
    type:String,
    enum:['Seller','Buyer'],
    default:'Buyer'
  }
});

const User = mongoose.model("User", userSchema);

export default User;