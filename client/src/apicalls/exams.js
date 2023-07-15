
import axiosInstance from ".";
// add exam 

export const addExam = async(payload)=>{
  console.log(payload);
  try{
     const response = await axiosInstance.post("/api/exams/add",payload);
     return response.data;
  }
  catch(error){
    return error.response.data;
  }
}


//get all exam 
export const getAllExams = async()=>{
  try{
    const response = await axiosInstance.post("/api/exams/get-all-exams");
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}

//get exam by id

export const getExamById = async(payload)=>{
  
  try{
        
     const response = await axiosInstance.post("/api/exams/get-exam-by-id",payload);
     return response.data;
  }
  catch(error){
    return error.response.data;
  }
}


// edit exam by id 

export const editExamById = async(payload)=>{
  try{
    const response = await axiosInstance.post("/api/exams/edit-exam-by-id",payload);
    return response.data;
  }
  catch(error){
     return error.response.data;
  }
}