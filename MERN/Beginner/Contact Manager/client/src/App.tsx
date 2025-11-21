import { Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
