/* eslint-disable no-unused-vars */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/adminLoginApi"; // Import your login mutation function
import { toast } from "react-toastify";

interface Data {
  message: string;
}

interface LoginObj {
  email: string;
  password: string;
}

interface LoginSchema {
  handaleSteps: (number: number, email: string) => void;
}

const Login: React.FC<LoginSchema> = ({ handaleSteps }) => {
  const [loginObj, setLoginObj] = useState<LoginObj>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: Data) => {
      if (data.message === 'Login successful') {
        handaleSteps(1, loginObj.email);
        toast.success(data.message)
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
    loginMutation.mutate(loginObj); // Trigger the mutation
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 m-auto flex flex-col w-[28rem] text-start    rounded-lg bg-white/10">
      <label>Email</label>
      <input
        className="border-gray-400 text-gray-500 w-full mb-8 p-3 outline-none  border-b "
        onChange={handleChange}
        value={loginObj.email}
        name="email"
        type="email"
        required
        placeholder="Enter your email...."
      />

      <label>Password</label>
      <input
        className="border-gray-400 text-gray-500 w-full mb-8 p-3 outline-none  border-b   "
        onChange={handleChange}
        value={loginObj.password}
        name="password"
        type="password"
        required
        placeholder="Enter your password...."
      />
  <button
          className="px-4 py-2 text-white bg-orange-500 rounded-md disabled:bg-gray-600"
          type="submit"
        >
          Login
        </button>

        <button type="button"  className="flex flex-col text-orange-500 w-fit mt-4 ml-auto "
        onClick={()=>{handaleSteps(2, loginObj.email)}}
        >Forget Password</button>
   
      <div></div>
    </form>
  );
};

export default Login;
