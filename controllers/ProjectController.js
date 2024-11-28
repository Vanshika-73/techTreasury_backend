import asyncHandler from "express-async-handler";

import Project from '../models/ProjectModel.js'
// @description- to fetch all Project
// @routes-  GET/api/Project
// @access- public
const getProjects= asyncHandler(
    async( req,res)=>{
        try {
          const projects= await Project.find();
            res.status(200).send(projects)
        } catch (error) {
            res.status(401).send({error: error.message});
        }
    }
);


// @desc -  to fetch single Project by ID
// @route - GET /api/Project/:_id
// @access - Public
const getProject = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.params;
      const project = await Project.findOne({ _id });
      res.status(200).send(project);
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });
  
// @desc -  to create new Project
// @route - POST /api/Project
// @access - Private
const createProject= asyncHandler(
    async(req,res)=>{
        try {
            const data={
              image: req.file ? req.file.path : null,
              ...req.body
            };
            const result= await Project.create(data);
            res.status(200).send(result);
        } catch (error) {
            res.status(401).send({error:error.message});
            
        }

    }
);

// @description- to update Project
// @routes-  PUT/api/Project
// @access- private
const updateProject = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.params;
      const data = req.body;
      const result = await Project.findByIdAndUpdate({ _id }, data, {
        new: true,
      });
  
      res.status(200).send(result);
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });
  
  // @desc -  to delete specific Project
  // @route - DELETE /api/Project/:_id
  // @access - Private
  const deleteProject = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.params;
      const result = await Project.findByIdAndDelete({ _id });
      res.status(200).send(result);
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });
  // review
  const createReview = asyncHandler(async (req, res, next) => {
    try {
      const { _id } = req.params;
      const data = req.body;
      const { reviews } = await Project.findById(_id);
      const newReviews = [...reviews, data];
      const rating =
        reviews.length !== 0
          ? newReviews.reduce((acc, i) => acc + i.rating, 0) / newReviews.length
          : data.rating;
  
      const result = await Project.findByIdAndUpdate(
        { _id },
        {
          $set: { ratings: rating.toFixed(1), numReviews: newReviews.length },
          $push: { reviews: data },
        },
        { new: true }
      );
  
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  });
  
  
export{getProjects,getProject,createProject,updateProject,deleteProject,createReview};