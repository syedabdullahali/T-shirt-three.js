import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  getAdminLoginDataById,
  postAdminLoginData,
  updateAdminLoginData,
  getCountryData
} from "../../api/adminLoginApi";
import { toast } from "react-toastify";
import { filterAndUpdate } from "../../api/querryfunction/function";
import { useNavigate, useParams } from "react-router-dom";
import LoadingForm from "../../components/Ui/LoadingForm";
import SelectInput from "../../components/Ui/SelectInput";

const UserLoginForm = () => {


  const obj = { name: '', email: '', password: '', status: '',
     mobileNumber: '',adharNumber: '',panCardNumber: '',pinCodeNumber: '',
     address: { city: '', state: '', country: '', postalCode: ''}
  };

  const { role: rightsVal, status,id="NO_DATA" } = useParams()
  const isEdit = status !== 'Add'.trim()
  const [newLoginAdminObj, setnewLoginAdminObj] = useState({ ...obj });
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [searchName,setSearchName] = useState('')
  const [value,setValue] = useState('')

  const {data,status:statusApi,isLoading} = useQuery({
    queryKey:['getAdminLoginById',id||"NO_DATA"],
    queryFn:()=>getAdminLoginDataById(id||"NO_DATA"),
    enabled:isEdit
  })

  const {data:countryData,status:statusCountryApi,isLoading:CountryApIsLoading} = useQuery({
    queryKey:['getCountryData',searchName],
    queryFn:()=>getCountryData(searchName)
  })


  const isEditLoading = status !== 'Add'.trim()?isLoading:false



  const postMutation = useMutation({
    mutationFn: postAdminLoginData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["adminLoginData"],
        exact: false,
      })
      if (data.message === "Successfully saved") {
        toast.success("Successfully save");
        setnewLoginAdminObj({ ...obj });
      } else {
        toast.error(data.message);
      }
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateAdminLoginData,
    onSuccess: (obj, _) => {
      queryClient.setQueryData(["adminLoginData"],
        filterAndUpdate(obj)); toast.success("Update Successfully");
    },
  });

  


  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setnewLoginAdminObj(prevState => {
      // Handle nested address fields
      if (name in prevState.address) {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [name]: value
          }
        };
      }
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      postMutation.mutate({
        ...newLoginAdminObj, role: rightsVal || "", status: typeof newLoginAdminObj.status === 'string'
          ? JSON.parse(newLoginAdminObj.status) : newLoginAdminObj.status
      });
    } else {
      updateMutation.mutate({ ...newLoginAdminObj, status: typeof newLoginAdminObj.status === 'string' ? JSON.parse(newLoginAdminObj.status) : newLoginAdminObj.status });
    }
  };

  useEffect(()=>{
    if(isEdit&&statusApi==='success'&&statusCountryApi==='success'){
      setnewLoginAdminObj({...data?.data,password:''})
    }
  },[statusApi,statusCountryApi])

  useEffect(()=>{

  },[])

  return ((
    <div className="relative h-full" >
      <button className="p-2 font-bold mr-auto block text-blue-600" onClick={() => {navigate('/Admin/Admin') }}>
      &larr; Go Back
      </button>

  
       {isLoading&&statusCountryApi&&<LoadingForm/>}
      {<form
        
        onSubmit={handleFormSubmit}
        className="mb-4 p-4 border rounded bg-gray-100 grid grid-cols-3 gap-2 m-2 text-start"
      >
        <div className="mb-2">
          <label className="block"> {rightsVal === 'admin' ? "Admin" : "Vendor"} Name:</label>
          <input
            className="border p-2 w-full"
            type="text"
            name="name"
            value={newLoginAdminObj.name}
            onChange={handleFormChange}
            required
            disabled={isEditLoading}
          />
        </div>
        <div className="mb-2">
          <label className="block">{rightsVal === 'admin' ? "Admin" : "Vendor"} Email:</label>
          <input
            className="border p-2 w-full"
            type="email"
            name="email"
            value={newLoginAdminObj.email}
            onChange={handleFormChange}
            disabled={isEditLoading}
          />
        </div>
        <div className="mb-2">
          <label className="block">

            {isEdit ? `Add New ${rightsVal === 'admin' ? "Admin" : "Vendor"} Password` : 
            `${rightsVal === 'admin' ? "Admin" : "Vendor"} Password`}

          </label>
          <input
            className="border p-2 w-full"
            type="text"
            name="password"
            value={newLoginAdminObj.password}
            onChange={handleFormChange}
            required={!isEdit}
            disabled={isEditLoading}
          />
        </div>
        <div className="mb-2">
          <label className="block">{rightsVal === 'admin' ? "Admin" : "Vendor"} Status:</label>
          <select
            className="border p-2 w-full"
            name="status"
            value={`${newLoginAdminObj.status}`}
            onChange={handleFormChange}
            required
                        disabled={isEditLoading}

          >
            <option value="">Select Status</option>
            <option value={`true`}>Active</option>
            <option value={`false`}>Inactive</option>
          </select>
        </div>

        {/* New fields for identification */}
        <div className="mb-2">
          <label className="block">{rightsVal === 'admin' ? "Admin" : "Vendor"} Mobile Number:</label>
          <input
            className="border p-2 w-full"
            type="text"
            name="mobileNumber"
            value={newLoginAdminObj.mobileNumber}
            onChange={handleFormChange}
            required
            disabled={isEditLoading}

          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {!isEdit ? "Add" : "Update"}
          </button>
        </div>
      </form>}
    </div>
  )
  );
};

export default UserLoginForm;
