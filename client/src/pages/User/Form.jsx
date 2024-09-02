import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  import  { useState, ChangeEvent, FormEvent } from "react";
  import { toast } from "react-toastify";
  import {filterAndUpdate } from "../../api/querryfunction/function";
import { postUserLoginData, updateUserLoginData } from "../../api/userLoginApi";



  const UserLoginForm = ({paging,searchQuery,isEdit,loginUserObj}) => {
  
  
    const obj = { fullName: "", email: "", status: false, password: "" };

    const [newUser, setNewUser] = useState({...loginUserObj });

    const queryClient = useQueryClient();
 
  
    const postMutation = useMutation({
      mutationFn: postUserLoginData,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["userLoginData"],
          exact: false,
        })
        if (data.message === "Successfully saved") {
          toast.success("Successfully save");
          setNewUser({ ...obj });
        } else {
          toast.error(data.message);
        }
      },
    });
  

  
    const updateMutation = useMutation({
      mutationFn: updateUserLoginData,
      onSuccess: (obj, _) => {
      queryClient.setQueryData(["userLoginData", searchQuery, paging],
      filterAndUpdate(obj)); toast.success("Update Successfully"); },
    });
  
   
    const handleFormChange = (
      e
    ) => {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (!isEdit) {
        postMutation.mutate({ ...newUser, status: typeof newUser.status === 'string'?JSON.parse(newUser.status):newUser.status });
      } else {
        updateMutation.mutate({ ...newUser, status: typeof newUser.status === 'string'?JSON.parse(newUser.status):newUser.status });
      }
    };
  
    
   
    return ((
          <form
            onSubmit={handleFormSubmit}
            className="mb-4 p-4 border rounded bg-gray-100 grid grid-cols-2 gap-2 m-2 text-start"
          >
            <div className="mb-2">
              <label className="block">Name:</label>
              <input
                className="border p-2 w-full"
                type="text"
                name="fullName"
                value={newUser.fullName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Email:</label>
              <input
                className="border p-2 w-full"
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">
                {isEdit ? "Add New Password" : "Password"}
              </label>
              <input
                className="border p-2 w-full"
                type="text"
                name="password"
                value={newUser.password}
                onChange={handleFormChange}
                required={!isEdit}
              />
            </div>
            <div className="mb-2">
              <label className="block">Status:</label>
              <select
                className="border p-2 w-full"
                name="status"
                value={`${newUser.status}`}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Status</option>
                <option value={`true`}>Active</option>
                <option value={`false`}>Inactive</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {!isEdit ? "Add" : "Update"}
              </button>
            </div>
          </form>
        )
    );
  };
  
  export default UserLoginForm;
  