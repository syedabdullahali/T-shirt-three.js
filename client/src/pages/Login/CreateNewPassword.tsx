/* eslint-disable no-unused-vars */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { verify_create_password } from "../../api/adminLoginApi"; // Import your login mutation function
import { toast } from "react-toastify";

interface Data {
  message: string;
}

interface LoginObj {
    password: string;
  confirmPassword: string;
}

interface LoginSchema {
  handaleSteps: (number:number,email: string,) => void;
  email:string,
  token:string
}

const CreateNewPassword: React.FC<LoginSchema> = ({ handaleSteps, email,token }) => {

  const [loginObj, setLoginObj] = useState<LoginObj>({
    password: "",
    confirmPassword: "",
  });


  const loginMutation = useMutation({
    mutationFn: verify_create_password,
    onSuccess: (data: Data) => {
      if (data.message ===  "Successfully saved") {
        handaleSteps(0, email);
        toast.success("Successfully Password Updated")
      }else{
        toast.error(data.message)
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginObj((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(loginObj.confirmPassword.trim()!==loginObj.password.trim()){
        console.log("hello")
        toast.dark("Password not matched")
    }else{
        loginMutation.mutate({email:email,password:loginObj.password,token}); // Trigger the mutation
    }
    toast.loading("Updating passsword....")
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 m-auto flex flex-col w-[28rem] text-start border-black/5 rounded-lg ">
      <label>New Password</label>
      <input
        className="border-gray-400 text-gray-500 w-full mb-8 p-3 outline-none border-b "
        onChange={handleChange}
        value={loginObj.password}
        name="password"
        type="password"
        required
        placeholder="Enter your email...."
      />

      <label>Confirm Password</label>
      <input
        className="border-gray-400 text-gray-500 w-full mb-8 p-3 outline-none border-b "
        onChange={handleChange}
        value={loginObj.confirmPassword}
        name="confirmPassword"
        type="password"
        required
        placeholder="Enter your password...."
      />

        <button
          className="px-4 py-2 text-white bg-orange-500 rounded-md disabled:bg-gray-600"
          type="submit"
        >
          Create Password
        </button>
   
    </form>
  );
};

export default CreateNewPassword;
