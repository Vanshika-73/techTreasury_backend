const routes = Router();
import { Router } from "express";
import { createProject, createReview, deleteProject, getProject, getProjects, updateProject } from "../controllers/ProjectController.js";
import multer from "multer";
import { isBuyer, isSeller } from "../middlewares/authentication.js";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save images in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });
  
const upload = multer({ storage: storage });


routes.post('/createProject',isSeller,upload.single('image'),createProject);
routes.get('/',getProjects);
routes.get('/:_id',getProject);
routes.put('/:_id',isSeller,updateProject);
routes.post("/reviews/:_id",isBuyer,createReview);
routes.delete('/:_id',isSeller,deleteProject);


export default routes;