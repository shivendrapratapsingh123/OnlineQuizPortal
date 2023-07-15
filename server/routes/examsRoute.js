
import express from "express";
import  Exam from "../models/examModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//add exam 

router.post("/add",authMiddleware,async(req,res)=>{
  try{
      //check if exam already exits
      const examExits = await Exam.findOne({name: req.body.name});
      if(examExits){
        return res.status(200).send({message:"Exam already exists",success: false});
      }
      req.body.questions = [];
      const newExam = new Exam(req.body);
      await newExam.save();
      res.send({
        message:"Exam added successfully",
        success: true
      });
  }
  catch(error){
    res.status(500).send({
      message:error.message,
      data: error,
      success:false
    });
  }
});

//get all exams
router.post("/get-all-exams",authMiddleware,async(req,res)=>{
  try{
      const exams = await Exam.find({});
      res.send({
        message: "Exams fetched successfully",
        data: exams,
        success: true
      });
  }
  catch(error){
        res.status(500).send({
          message: error.message,
          data: error,
          success: false
        });
  }
});

// get exam by id

router.post("/get-exam-by-id",authMiddleware,async(req,res)=>{
    try{
   const exam = await Exam.findById(req.body.examId);
   res.send({
    message:"Exam fetched successfully",
    data: exam,
    success: true
   })
      
    }
    catch(error){
      res.status(500).send({
        message: error.message,
        data: error,
        success: false
      })
    }
});

// edit exam by id 

router.post("/edit-exam-by-id",authMiddleware, async(req,res)=>{
 try{
     await Exam.findByIdAndUpdate(req.body.examId, req.body);
     res.send({
      message: "Exam edited successfully",
      success: true
     });
 }
 catch(error){
  res.status(500).send({
    message: error.message,
    data: error,
    success: false
  });
 }
});


//delete exam by id 
router.post("/delete-exam-by-id",authMiddleware,async(req,res)=>{

  try{
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfylly",
      success: true
    });
  }
  catch(error){
    res.status(500).send({
      message: error.message,
      data: error,
      success: false
    });
  }
});


export default router;