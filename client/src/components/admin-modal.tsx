import { useAdminStore } from "../api/admin";
import React from "react";
import useCustomToast from "../hooks/useToast";
import { Spinner } from "@chakra-ui/react";

interface IAdminModalProps {
  toggleModal: () => void;
  id: number;
}

const AdminModal: React.FC<IAdminModalProps> = ({ toggleModal, id }) => {
  const toast = useCustomToast();
  const { loading, users, deleteUser, getAllUsers } = useAdminStore();
  const found = users?.find((item) => item?.id === id);
  const handleVerify = async () => {
    if (id) {
      await deleteUser(id).then((res) => toast(res, "success"));
      toggleModal();
      await getAllUsers();
    } else {
      toast("cannot find user with the id!", "warning");
    }
  };

  return (
    <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full inset-0 bg-black/50 backdrop-blur-md">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete this user
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div>
            <div className="text-white text-xl py-2 text-center mb-4">
              do you want to really delete this user: {found?.email}?
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
                onClick={handleVerify}
              >
                {loading ? <Spinner /> : "Delete User Account"}
              </button>
              <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
