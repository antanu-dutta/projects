import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.password) return;
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData
      );
      if (res.status === 409) return toast.error(res.data.message);
      if (res.status === 201) {
        toast.success(res.data.message);
        return navigate("/login");
      }
      if (res.status === 500) return toast.error(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Something went wrong";
        toast.error(msg);
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[700px]">
      <div className="shadow-primary w-[400px] p-3 bg-white">
        <h4 className="text-center tracking-wider text-gray-600 text-xl mb-10">
          Register Here
        </h4>

        <div>
          <div className="space-y-1.5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border-b border-gray-500 outline-none px-2 py-2 text-sm text-gray-600"
            />

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
              {loading ? <Loading /> : "Register"}
            </button>

            <p className="text-center text-sm mt-4 text-gray-500">
              Already have an account?
              <Link to="/login" className="text-purple-600 ms-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
