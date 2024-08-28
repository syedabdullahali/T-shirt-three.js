/* eslint-disable no-unused-vars */
import React, { useState, KeyboardEvent, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, verify_emailCheck_Otp } from "../../api/adminLoginApi"; // Import your login mutation function
import { toast } from "react-toastify";

interface OTPProps {
  email: string;
  isEmailCheck:boolean,
  handaleConfirmEmailSteps:(number:number,email:string,token:string)=>void
}

const Otp: React.FC<OTPProps> = ({ email,isEmailCheck,handaleConfirmEmailSteps }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: isEmailCheck?verify_emailCheck_Otp :verifyOtp,
    onSuccess: async (data) => {

      if(isEmailCheck&&data.message==="Successfully saved"){
        handaleConfirmEmailSteps(4,email,data.token)
        toast.success("OTP Confirm")
        return
      }
      if (data.status === 200) {
        const dataAuth = await data.json();
        localStorage.setItem('user-auth', JSON.stringify({ token: dataAuth.token, name: dataAuth.name,
          email: dataAuth.email}));
        navigate('/degine');
      }else{
        toast.error("Invalid OTP")
      }
    },
  });

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || isNaN(parseInt(value))) return; // Ensure only single numeric character is entered

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if a value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index - 1] = "";
          return newOtp;
        });
      } else {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index] = "";
          return newOtp;
        });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, otp: otp.join('') });
  };

  return (
    <form onSubmit={handleSubmit} className="p-16 w-[30rem] m-auto flex justify-center items-center flex-col  rounded-lg  border-black/5">
      <div className="flex mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="border-gray-400 text-gray-500 w-12 h-12 mr-2 text-center border rounded-md text-xl"
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            required
          />
        ))}
      </div>
      <button
          type="submit"
          className="px-4 py-2 w-full text-white bg-orange-500 border rounded-md disabled:bg-gray-600"
        >
          Verify OTP
        </button>

      <div>
      </div>
    </form>
  );
};

export default Otp;
