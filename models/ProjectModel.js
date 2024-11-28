import mongoose from "mongoose";

const reviewSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    rating: {
        type: Number,
        required: true,
      },
    name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
    },
})

const projectSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    domain:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum:['School Student','Collegeate','Working Professional'],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    projectOwner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ratings:{
        type:Number,
        //  required:true,
    },
    numReviews:{
        type:Number,
        default:0
        // required: true,
    },
    reviews:[reviewSchema]
});

const  Project = new mongoose.model('Project', projectSchema);

export default Project;