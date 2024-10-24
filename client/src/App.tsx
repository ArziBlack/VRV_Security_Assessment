import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Sidebar from "./components/sidebar";
import Profile from "./views/profile";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-full">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Sidebar />}>
          <Route index element={ <Profile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
