const baseUrl = import.meta.env.VITE_BASE_URL;
const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user-auth") || '{}')?.token;
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `${token}` : '',
  };
};

const login = async (data) => {
  const response = await fetch(`${baseUrl}/admin/login`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

const verify_email = async (data) => {
  const response = await fetch(`${baseUrl}/admin/verify_email`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};


const verify_emailCheck_Otp = async (data) => {
  const response = await fetch(`${baseUrl}/admin/verify_email_otp`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};
const verify_create_password = async (data)  => {
  const response = await fetch(`${baseUrl}/admin/create_verify_email_password`, {
    method: "POST",
    headers:  {
      "Content-Type": "application/json",
      "Authorization": data.token ? `${data.token}` :'',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const verifyOtp = async (data) => {
  const response = await fetch(`${baseUrl}/admin/verify_otp`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response;
};

const getAdminLoginData = async (name: string, page: number, limit: number,rightsVal:string) => {
  const response = await fetch(`${baseUrl}/admin/all?name=${name}&page=${page}&limit=${limit}&rightsVal=${rightsVal}`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

const postAdminLoginData = async (data) => {
  const response = await fetch(`${baseUrl}/admin/create`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteAdminLoginData = async (id) => {
  const response = await fetch(`${baseUrl}/admin/delete/${id}`, {
    method: "DELETE",
    headers:getHeaders(),
  });
  return response.json();
};

const updateAdminLoginData = async (obj) => {
  if (!obj.password.trim()) {
    obj.password = obj.prevPassword;
  }
  const id = obj._id;
  delete obj.prevPassword;

  // console.log(obj);

  const response = await fetch(`${baseUrl}/admin/update/${id}`, {
    method: "PATCH",
    headers:getHeaders(),
    body: JSON.stringify(obj),
  });
  return response.json();
};

const getAdminLoginDataById = async (id) => {
  const response = await fetch(`${baseUrl}/admin/admin/${id}`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

const getCountryData = async (searchName) => {
  const response = await fetch(`${baseUrl}/global/get_all_CountryList?searchName=${searchName}`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

const checkUSerActivity  = async (data) => {
  const response = await fetch(`${baseUrl}/admin/check_user_activity`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};


export { login, verifyOtp, getAdminLoginData, postAdminLoginData, deleteAdminLoginData,
        getAdminLoginDataById, updateAdminLoginData,verify_email,verify_emailCheck_Otp,
        verify_create_password,getCountryData,checkUSerActivity};
