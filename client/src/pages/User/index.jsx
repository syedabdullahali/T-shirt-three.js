import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import DeletePopUp from "../../component/Model/DeletePopUp";
import Pagination from "../../component/Ui/Pagination";
import { fillterAndDelete } from "../../api/querryfunction/function";
import { DeleteIcon, UpdateIcon } from "../../component/icon/Icon";
import UserLoginForm from "./Form";
import { deleteUserLoginData, getUserLoginData } from "../../api/userLoginApi";
import { formatDateFun } from "../../function/function";
import { NoDataAvailable } from "../../component/Model/NoDataAvailable";
const LoginUsers = () => {

  const obj = { fullName: "", email: "", status: false, password: "" };

  const [paging, setPaging] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5; // Number of items per page
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["userLoginData", searchQuery, paging],
    queryFn: () => getUserLoginData(searchQuery, paging + 1, pageSize),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserLoginData,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["userLoginData", searchQuery, paging],
        fillterAndDelete(variables)
      );
      toast.error("Deleted Successfully");
      setIsDeleteDialogOpen("");
    },
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loginUserObj, setLoginUserObj] = useState({ ...obj });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPaging(0);
  };

  const handaleEdit = (user: any) => {
    setLoginUserObj(() => ({
      ...user,
      prevPassword: user.password,
      password: "",
    }));
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div>
      {isFormOpen && (
        <UserLoginForm
          paging={paging}
          searchQuery={searchQuery}
          isEdit={isEdit}
          loginUserObj={loginUserObj}
        />
      )}

      <div className="w-full py-4 px-2 flex flex-col">
        <div className="w-full py-4 px-2 flex justify-between">
          <div>
            <label className="font-[700] block text-start mb-1">
              Search by Email or Name
            </label>
            <input
              className="border outline-none p-2 w-96"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search email..."
            />
          </div>

          {!isFormOpen ? (
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded mb-4 w-34"
            >
              Add Admin login
            </button>
          ) : (
            <button
              onClick={() => {
                setIsFormOpen(false);
                setLoginUserObj({ ...obj });
                setIsEdit(false);
              }}
              className="px-4 py-1 border-red-600 text-red-500 border rounded mb-4 w-34"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <table className="w-full text-center">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Status</th>
            <th className="p-2">Edit/Delete</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {data?.data?.map((user) => (
              <tr key={user._id}>
                <td className="p-2">{user.fullName}</td>

                <td className="p-2">{user.email}</td>

                <td className="p-2">{formatDateFun(user?.createdAt)}</td>

                <td className="p-2">
                  <button
                    className={`p-2 border  text-sm font-[400] w-16 rounded ${
                      user.status ? "border-green-600 text-green-600" : "border-red-500 text-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "InActive"}
                  </button>
                </td>

                <td className="p-2">
                  <button
                    className="border-gray-500 border text-gray-500 p-1 rounded mr-2"
                    onClick={() => handaleEdit(user)}
                  >
                    <UpdateIcon height="24px" width="24px" />
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteDialogOpen(user?._id||"");
                    }}
                    className="border-red-500 border text-red-500 p-1 rounded"
                  >
                    <DeleteIcon height="24px" width="24px" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      { isLoading || !!data?.totalDocuments || 
        <NoDataAvailable/>
        }
      <div>
        {isLoading && (
          <div className="h-32 w-full flex justify-center items-center ">
            <div className=" w-fit h-fit">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <Pagination
        currentPage={data?.currentPage}
        setPaging={setPaging}
        totalDocuments={data?.totalDocuments}
        paging={paging}
      />

      <DeletePopUp
        isOpen={!!isDeleteDialogOpen}
        onConfirm={() => deleteMutation.mutate(isDeleteDialogOpen)}
        onClose={() => setIsDeleteDialogOpen("")}
      />
    </div>
  );
};

export default LoginUsers;
