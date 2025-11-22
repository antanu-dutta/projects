import React from "react";
import Container from "../components/reusable/Container";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="pt-24">
      <Container>
        <div className="h-[700px] flex items-start justify-center">
          {/* login box */}
          <div className="bg-white shadow-primary p-3 w-[400px] mt-28">
            {/* login heading */}
            <h4 className="text-center text-2xl tracking-wide font-normal mb-10">
              Welcome back
            </h4>

            {/* login form */}
            <div className="space-y-2 ">
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full">
                <Mail size={15} className="text-orange-700" />
                <input
                  type="text"
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Your email"
                />
              </div>
              <div className="flex items-center gap-3 w-full border-orange-700 border px-4 py-2 rounded-full mb-1">
                <Lock size={15} className="text-orange-700" />
                <input
                  type="password"
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-red-600 text-xs ">
                  {/* Please enter a strong password */}
                </p>
                <p className="text-gray-600 text-sm cursor-pointer hover:text-gray-700">
                  Forget Password?
                </p>
              </div>

              {/* login button */}
              <div className="w-full text-center">
                <button
                  type="submit"
                  className="text-center bg-orange-700 text-white rounded-full px-6 py-2 tracking-wide cursor-pointer hover:bg-orange-800 transition-all duration-300"
                >
                  Login
                </button>
              </div>

              {/* new account creation link */}
              <Link to={"/signup"}>
                <p className="text-center text-sm text-gray-600">
                  New here?{" "}
                  <span className="text-orange-700 cursor-pointer">
                    Create one
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
