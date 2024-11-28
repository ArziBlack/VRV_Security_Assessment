/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Label from "./label";
import InputField from "./input";
import { useAuthStore } from "../api/auth";
import { Profile } from "../interfaces/user";
import useCustomToast from "../hooks/useToast";
import { Spinner } from "@chakra-ui/react";

interface IUpdateModalProps {
  toggleModal: () => void;
}

const UpdateModal: React.FC<IUpdateModalProps> = ({ toggleModal }) => {
  const toast = useCustomToast();
  const { user, update_profile, loading } = useAuthStore();
  const [profile, setProfile] = React.useState<Profile>({
    name: user?.name || "",
    role: user?.role || "MEMBER",
    country: user?.country || "",
    phone: user?.phone || "",
    homeAddress: user?.homeAddress || "",
    state: user?.state || "",
    organisation: user?.organisation || "",
    techUsed: user?.techUsed || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  //   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const newArea = event.target.value;
  //     setProfile((prevProfile) => ({
  //       ...prevProfile,
  //       areasOfFocus: newArea,
  //     }));
  //   };

  console.log(profile);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const field = profile;
    const id = user?.id;
    if (id && field) {
      await update_profile(field, id).then(() =>
        toast(`updated successfully`, "success")
      );
    } else {
      toast("cannot update blank fields!", "warning");
    }
  };

  return (
    <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full inset-0 bg-black/50 backdrop-blur-md">
      <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update My Profile
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
          {/* <!-- Modal body --> */}
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-3">
              <div>
                <Label label="name" htmlFor="name" />
                <InputField
                  name="name"
                  onChange={handleChange}
                  value={profile?.name as string}
                />
              </div>
              <div>
                <Label label="country" htmlFor="country" />
                <InputField
                  name="country"
                  onChange={handleChange}
                  value={profile?.country as string}
                />
              </div>
              <div>
                <Label label="phone" htmlFor="phone" />
                <InputField
                  name="phone"
                  onChange={handleChange}
                  value={profile?.phone as string}
                />
              </div>
              {/* <div>
                <Label label="Area of Focus" htmlFor="areasOfFocus" />
                <select
                  id="areasOfFocus"
                  name="areasOfFocus"
                  onChange={handleSelectChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Electronics</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div> */}
              <div className="">
                <Label label="state" htmlFor="state" />
                <InputField
                  name="state"
                  onChange={handleChange}
                  value={profile?.state as string}
                />
              </div>
              <div className="">
                <Label label="Home Address" htmlFor="homeAddress" />
                <InputField
                  name="homeAddress"
                  onChange={handleChange}
                  value={profile?.homeAddress as string}
                />
              </div>
              <div className="">
                <Label label="organisation" htmlFor="organisation" />
                <InputField
                  name="organisation"
                  onChange={handleChange}
                  value={profile?.organisation as string}
                />
              </div>
              <div className="">
                <Label label="Tech Used" htmlFor="techUsed" />
                <InputField
                  name="techUsed"
                  onChange={handleChange}
                  value={profile?.techUsed as string}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
                onClick={handleUpdate}
              >
                {loading ? <Spinner /> : "Update Profile"}
              </button>
              <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
