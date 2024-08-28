/* eslint-disable no-unused-vars */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {verify_email } from "../../api/adminLoginApi"; // Import your login mutation function
import { toast } from "react-toastify";

interface Data {
  message: string;
}

interface LoginObj {
  email: string;
}

interface LoginSchema {
  handaleSteps: (number: number, email: string) => void;
  email:string
}

const Email: React.FC<LoginSchema> = ({ handaleSteps,email }) => {
  const [loginObj, setLoginObj] = useState<LoginObj>({
    email:email,
  });

  const loginMutation = useMutation({
    mutationFn: verify_email,
    onSuccess: (data: Data) => {
      if (data.message === "Successfully Confirm") {
        handaleSteps(3, loginObj.email);
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
    <form onSubmit={handleSubmit} className="p-8 m-auto flex flex-col w-[28rem]  rounded-lg ">
      <label className="text-start">Email</label>
      <input
        className="border-gray-400 text-gray-500 w-full mb-8 p-3 outline-none  border-b "
        onChange={handleChange}
        value={loginObj.email}
        name="email"
        type="email"
        required
        placeholder="Enter your email...."
      />

<button
          className="px-4 py-2 text-white bg-orange-500 rounded-md disabled:bg-gray-600"
          type="submit"
        >
          Confirm Email
        </button>
    </form>
  );
};

export default Email;
