
import React from "react";
import { Form, message} from "antd";
import {Link} from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";

function Register() {

  const dispatch = useDispatch();
  const navigate  = useNavigate()

 const onFinish = async(values) =>
 {
    try{

      dispatch(ShowLoading());

      const response = await registerUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        navigate("/login");
      }
      else{
        message.error(response.message);
      }
    }
    catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
 }


  return(
    <div className="flex justify-center items-center h-screan w-screan bg-white ">
    <div className="card w-400 p-3 bg-y">
    <div className="flex flex-col">
     <div className="flex flex-col">
     <h1 className="text-2xl">
       EduQuiz Register <i class="ri-user-add-line"></i>
      </h1>
     </div>
      <div className="divider"></div>
      <Form
      layout="vertical"
      onFinish={onFinish}
      >
       <Form.Item name="name" label="Name">
          <input type="text"></input>
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input type="text"></input>
        </Form.Item>
        <Form.Item name="password" label="Password" >
        <input type="password" ></input>
        </Form.Item>
        <div className="flex flex-col gap-2">
        <button type="submit" className="primary-contained-btn mt-2 w-100">Register</button>
        <Link to="/login">Allready a member? Login</Link>
        </div>
      </Form>
      </div>
    </div>
    </div>
  )
}

export default Register;