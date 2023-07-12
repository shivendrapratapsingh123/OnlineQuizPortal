
import  Jwt  from "jsonwebtoken";


  const authMiddleware =  (req,res,next)=>{
  
try{
   const token = req.headers.authorization.split(" ")[1];
   const decodedToken = Jwt.verify(token,process.env.JWT_SECRET);
   const userId = decodedToken.userId;
   req.body.userId = userId;
   next();
}
catch(error){
  
    res.status(401).send({
      message: "You are not authenticated",
      data: error,
      success:false
    });
}
  
};
export default authMiddleware;