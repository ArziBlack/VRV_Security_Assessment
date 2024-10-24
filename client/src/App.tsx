import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Sidebar from "./components/sidebar";
import Profile from "./views/profile";
import DataTable from "./views/table";
import ProtectedRoute from "./utils/protected-route";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-full">
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Layout with Sidebar for protected pages */}
          <Route element={<Sidebar />}>
            {/* Default route to Profile */}
            <Route index element={<Profile />} />
            {/* Additional protected routes */}
            <Route path="users" element={<DataTable />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
