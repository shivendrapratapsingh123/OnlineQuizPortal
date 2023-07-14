
import React from "react";
import { Form, message} from "antd";
import {Link} from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {

  const dispatch = useDispatch();

 const onFinish = async(values) =>
 {
    try{

      dispatch(ShowLoading());

      const response = await registerUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
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
    <div className="flex justify-center items-center h-screan w-screan">
    <div className="card w-400 p-3">
    <div className="flex flex-col">
      <h1 className="text-2xl">
        Register
      </h1>
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