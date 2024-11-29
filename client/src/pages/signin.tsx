import useCustomToast from "../hooks/useToast";
import { useAuthStore } from "../api/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Role } from "../interfaces/auth";
import { HiEyeSlash } from "react-icons/hi2";
import { HiEye } from "react-icons/hi";
import Label from "../components/label";
import InputField from "../components/input";

const Signin = (): React.JSX.Element => {
  const toast = useCustomToast();
  const navigate = useNavigate();
  const { signin, loading, isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [show, setShow] = useState(false);

  function toggleShowPassword() {
    setShow(!show);
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
      toast("Email or Password cannot be blank!", "warning");
      return;
    }

    await signin(email, password)
      .then((res) => {
        if (res.success) {
          toast(res.message, "success");
        } else {
          toast(res.message, "error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        if (user?.role === Role.MEMBER) {
          navigate("/");
        } else if (user?.role === Role.ADMIN) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    }
  }, [isAuthenticated]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          VRV Security
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
