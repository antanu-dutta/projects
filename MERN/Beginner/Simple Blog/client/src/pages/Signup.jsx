import React, { useState } from "react";
import Container from "../components/reusable/Container";
import { Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call here
  };

  return (
    <div className="pt-24">
      <Container>
        <div className="h-[700px] flex items-start justify-center">
          {/* signup box */}
          <div className="bg-white shadow-primary p-3 w-[400px] mt-20">
            {/* signup heading */}
            <h4 className="text-center text-2xl tracking-wide font-normal mb-10">
              Create your account
            </h4>

            {/* signup form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* name field */}
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full">
                <User size={15} className="text-orange-700" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Your full name"
                />
              </div>

              {/* email field */}
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full">
                <Mail size={15} className="text-orange-700" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Your email"
                />
              </div>

              {/* password field */}
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full">
                <Lock size={15} className="text-orange-700" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Create password"
                />
              </div>

              {/* confirm password */}
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full mb-1">
                <Lock size={15} className="text-orange-700" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Confirm password"
                />
              </div>

              {/* error message space */}
              <div className="text-right">
                <p className="text-red-600 text-xs">{/* dynamic error */}</p>
              </div>

              {/* signup button */}
              <div className="w-full text-center">
                <button
                  type="submit"
                  className="text-center bg-orange-700 text-white rounded-full px-6 py-2 tracking-wide cursor-pointer hover:bg-orange-800 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>

              {/* redirect login */}
              <Link to={"/login"}>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <span className="text-orange-700 cursor-pointer">
                    Login here
                  </span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
