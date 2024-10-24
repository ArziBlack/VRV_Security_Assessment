import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
