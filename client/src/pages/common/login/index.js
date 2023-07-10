
import React from "react";
import { Form, message} from "antd";
import {Link} from "react-router-dom";
import { loginUser } from "../../../apicalls/users";

function Login() {

 const onFinish = async(values) =>
 {
   try{
        const response = await loginUser(values);
        if(response.success){
          message.success(response.message);
          localStorage.setItem("token",response.data);
        }
        else{
          message.error(response.message);
        }
   }catch(error){
    message.error(error.message);
   }
 }


  return(
    <div className="flex justify-center items-center h-screan w-screan">
    <div className="card w-400 p-3">
    <div className="flex flex-col">
      <h1 className="text-2xl">
        Login
      </h1>
      <div className="divider"></div>
      <Form
      layout="vertical"
      onFinish={onFinish}
      >
        <Form.Item name="email" label="Email">
          <input type="text"></input>
        </Form.Item>
        <Form.Item name="password" label="Password" >
        <input type="password" ></input>
        </Form.Item>
        <div className="flex flex-col gap-2">
        <button type="submit" className="primary-contained-btn mt-2 w-100">Login</button>
        <Link to="/register">Not a member? Register</Link>
        </div>
      </Form>
      </div>
    </div>
    </div>
  )
}

export default Login;