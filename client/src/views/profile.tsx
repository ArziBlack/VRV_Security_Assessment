import React, { useState } from "react";
import Button from "../components/button";
import UpdateModal from "../components/update-modal";
import { useAuthStore } from "../api/auth";

const Profile = (): React.JSX.Element => {
  const { user } = useAuthStore();
  const [modal, setModal] = useState(false);
  function toggleModal() {
    setModal(!modal);
  }
  console.log(user?.isVerified);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8 px-8">
      <div className="min-h-screen">
        <div className="py-4 md:py-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img
                  className="h-16 w-16 rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                  alt="Helene avatar"
                />
                <div>
                  <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    {" "}
                    {user?.isVerified ? "Verified" : "Not Verified"}
                  </span>
                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {user?.name}
                  </h2>
                </div>
              </div>
              <dl className="">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Email Address
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {user?.email}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Home Address
                </dt>
                <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                  </svg>
                  {user?.homeAddress}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Country
                </dt>
                <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                  {user?.country}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  State/Province/Region
                </dt>
                <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                  {user?.state}
                </dd>
              </dl>
            </div>
            <div className="space-y-4">
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  +{user?.phone}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Organisation
                </dt>
                <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg
                    className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                    />
                  </svg>
                  {user?.organisation || "VRV Security"}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Areas of Focus
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {user?.areasOfFocus
                    ? user?.areasOfFocus.map((item) => item)
                    : "null"}
                </dd>
              </dl>
              <dl>
                <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Timestamp
                </dt>
                <dd className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img
                      className="h-4 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                      alt=""
                    />
                    <img
                      className="hidden h-4 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-sm">
                      <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                        Joined on {user?.createdAt}
                      </p>
                      <p className="font-normal text-gray-500 dark:text-gray-400">
                        Updated at {user?.updatedAt}
                      </p>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <Button name="Edit Your Data" onClick={toggleModal} />
        </div>
      </div>
      {modal && <UpdateModal toggleModal={toggleModal} />}
    </section>
  );
};

export default Profile;
