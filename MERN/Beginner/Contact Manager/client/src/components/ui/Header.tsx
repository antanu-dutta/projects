import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { User, LogOut, Settings, User2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    // Optionally remove cookie via backend or axios
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/me", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="shadow-primary">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between">
        {/* logo name */}
        <div className="text-xl font-bold">Contact Manager</div>

        {/* navigation */}
        <ul className="flex items-center gap-5 text-sm">
          <li className="cursor-pointer hover:text-purple-600 duration-200">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="cursor-pointer hover:text-purple-600 duration-200">
            Create
          </li>
        </ul>

        {/* user login/profile section */}
        <div>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer hover:bg-purple-700 duration-200"
                onClick={() => setOpen(!open)}
              >
                <User size={20} />
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 animate-fade-in">
                  {/* Top user info */}
                  <div className="border-b pb-3 mb-3">
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <User2 size={16} /> {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {/* Buttons */}
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
                      <Settings size={16} /> Settings
                    </li>
                    <li
                      className="flex items-center gap-2 p-2 hover:bg-red-100 text-red-600 rounded cursor-pointer text-sm"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="px-7 py-2 bg-purple-600 text-white cursor-pointer hover:bg-purple-900 duration-200 ease-in-out">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
