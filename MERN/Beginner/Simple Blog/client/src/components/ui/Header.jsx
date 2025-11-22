import React, { useEffect, useRef, useState } from "react";
import Container from "../reusable/Container";
import logo from "../../assets/logo.jpeg";
import { Lock, LogOut, Pencil, Search, Settings, User } from "lucide-react";
import { CiLogout, CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="shadow-primary fixed w-full z-50 bg-white">
      <Container>
        <div className="py-3 px-2 flex items-center justify-between">
          {/* logo */}
          <Link to="/">
            <img src={logo} alt="" className="w-16" />
          </Link>

          {/* search input */}
          <div className="flex items-start w-[500px] h-10 gap-2 ">
            <div className="relative w-full">
              <input
                type="text"
                className="px-5 py-2 outline-none w-full border border-gray-500 h-full rounded-full text-gray-600 text-sm tracking-wide"
                placeholder="Search blog"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {/* search result box */}
              <div className="w-full absolute rounded hidden  bg-white shadow-primary p-3 z-50"></div>
            </div>

            <button className="px-5 py-1 text-white rounded-full h-full bg-orange-700 text-sm cursor-pointer hover:bg-orange-800 transition-all duration-300 flex items-center gap-3">
              {/* Search */}
              <Search size={19} />
            </button>
          </div>

          {/* buttons */}
          {/* before login buttons */}
          <div className="flex items-center gap-5 ">
            <Link to="/create">
              <button className="px-4 py-1 rounded-full flex items-center gap-2 text-sm tracking-wide bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-300">
                <Pencil size={15} />
                Write
              </button>
            </Link>

            <Link to={"/login"}>
              <button className="px-4 py-1 rounded-full flex items-center gap-2 text-sm tracking-wide bg-orange-700 text-white hover:bg-orange-800 transition-all duration-300 cursor-pointer">
                <SiGnuprivacyguard size={15} />
                Sign up
              </button>
            </Link>
          </div>
          {/* after login buttons */}
          <div className="relative hidden" ref={dropdownRef}>
            <div
              onClick={() => setDropdown(!dropdown)}
              className="w-10 h-10 rounded-full bg-orange-700 flex items-center justify-center text-white text-xl"
            >
              A
            </div>
            {/* dropwdown */}
            {dropdown && (
              <div className="absolute w-[200px] rounded mt-1 bg-white shadow p-3">
                <div className="flex items-start flex-col gap-4">
                  <button className=" hover:bg-gray-200 transition-all w-full px-3 py-1 text-start rounded cursor-pointer flex items-center gap-2">
                    <User size={15} />
                    Profile
                  </button>
                  <button className=" hover:bg-gray-200 transition-all w-full px-3 py-1 text-start rounded cursor-pointer flex items-center gap-2">
                    <Settings size={15} />
                    Settings
                  </button>
                  <button className="text-red-700 hover:bg-gray-200 transition-all w-full px-3 py-1 text-start rounded cursor-pointer flex items-center gap-2">
                    <CiLogout size={15} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
