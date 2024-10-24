import { useAuthStore } from "../api/auth";
import React, { useState } from "react";

interface Profile {
  name: string | null;
  password: string;
  email: string | null;
  role: string | null;
}

const Profile = (): React.JSX.Element => {
  const { user, update_profile } = useAuthStore();
  const [profile, setProfile] = useState<Profile>({
    name: user?.name || "",
    password: "",
    email: user?.email || "",
    role: user?.role || "MEMBER",
  });

  const { name, password } = profile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleUpdate = (field: keyof Profile) => {
    console.log(`Updated ${field}: ${profile[field]}`);
    const id = user?.id as string;
    if (name && password) {
      update_profile(name, password, id);
    } else {
      console.log("blank fields!!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[700px] max-w-md grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={profile?.name as string}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={() => handleUpdate("name")}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Update Name
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={profile?.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={() => handleUpdate("password")}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Update Password
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={profile?.email as string}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={() => handleUpdate("email")}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Update Email
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role:
          </label>
          <input
            type="text"
            name="role"
            value={profile?.role as string}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={() => handleUpdate("role")}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
