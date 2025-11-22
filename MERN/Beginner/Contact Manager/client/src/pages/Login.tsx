import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, setUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (!formData.email || !formData.password)
      return toast.error("All fields are required");

    try {
      const res = await login(formData);
      console.log(res);
      if (res.status === 200) {
        setUser(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[700px]">
      <div className="shadow-primary w-[400px] p-3 bg-white">
        <h4 className="text-center tracking-wider text-gray-600 text-xl mb-10">
          Login Here
        </h4>

        <div className="space-y-1.5">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full border-b border-gray-500 outline-none px-2 py-2 text-sm text-gray-600"
          />

          <div className="flex items-center justify-between border-b border-gray-500">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full outline-none px-2 py-2 text-sm text-gray-600"
            />

            <span
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            className="mt-6 text-center w-full bg-purple-500 text-white py-2"
            onClick={onSubmit}
          >
            Login
          </button>

          <p className="text-center text-sm mt-4 text-gray-500">
            Not registered?
            <Link to="/register" className="text-purple-600 ms-2">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
