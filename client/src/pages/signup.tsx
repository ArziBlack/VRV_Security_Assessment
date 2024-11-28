/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuthStore } from "../api/auth";
import useCustomToast from "../hooks/useToast";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { HiEyeSlash } from "react-icons/hi2";
import { HiEye } from "react-icons/hi";
import Label from "../components/label";
import InputField from "../components/input";

const Signup = (): React.JSX.Element => {
  const toast = useCustomToast();
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  function toggleShowPassword() {
    setShow(!show);
  }

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !password && !confirmPassword) {
      toast("Fields cannot be blank!", "warning");
    }
    await signup(name, email, password, confirmPassword)
      .then((res) => {
        if (res.success) {
          toast(res.message, "success");
          setTimeout(() => {
            navigate("/signin");
          }, 1500);
        } else {
          toast(res.message, "error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          VRV Security
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5 space-y-3 md:space-y-5 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="grid grid-cols-2 gap-4" action="#">
              <div>
                <Label label="Your Name" htmlFor="name" />
                <InputField
                  type="name"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Label label="Your Email" htmlFor={"email"} />
                <InputField
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johndoe@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Label label="Password" htmlFor="password" />
                <div className="bg-gray-50 border dark:bg-gray-700 border-gray-300 flex rounded-lg dark:border-gray-600 focus:ring-primary-600 focus:border-primary-600 items-center dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <InputField
                    type={!show ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    required
                    placeholder="••••••••"
                    className="bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white border-none outline-none"
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="w-8 flex items-center justify-center"
                  >
                    {show ? (
                      <HiEyeSlash color="white" />
                    ) : (
                      <HiEye color="white" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label label="Confirm Password" htmlFor="confirm-password" />
                <div className="bg-gray-50 border dark:bg-gray-700 border-gray-300 flex rounded-lg dark:border-gray-600 focus:ring-primary-600 focus:border-primary-600 items-center dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <input
                    type={!show ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white outline-none"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="w-8 flex items-center justify-center"
                  >
                    {show ? (
                      <HiEyeSlash color="white" />
                    ) : (
                      <HiEye color="white" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label label="Your Country" htmlFor={"country"} />
                <InputField
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Nigeria"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Label label="Phone Number" htmlFor={"phone"} />
                <InputField
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="+2349037289192"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Label label="Your State/Region/Province" htmlFor={"state"} />
                <InputField
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Nigeria"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Label label="Home Address" htmlFor={"homeAddress"} />
                <InputField
                  type="text"
                  name="homeAddress"
                  id="homeAddress"
                  placeholder="No. 1 Cliff Street off crecent ave LA"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
