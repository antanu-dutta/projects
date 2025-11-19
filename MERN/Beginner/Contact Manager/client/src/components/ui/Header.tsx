import { BadgePlus, House, List } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-header shadow-primary text-white">
      <div className="max-w-7xl mx-auto p-3">
        <div className="flex items-center justify-between py-3">
          {/* logo */}
          <div>
            <h3>Contact.App</h3>
          </div>

          {/* navigation */}
          <ul className="flex items-center justify-center gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-blue-500 font-semibold" : "text-white"
                  }`
                }
              >
                <House size={16} />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/list"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-blue-500 font-semibold" : "text-white"
                  }`
                }
              >
                <List size={16} />
                List
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-blue-500 font-semibold" : "text-white"
                  }`
                }
              >
                <BadgePlus size={16} />
                Create
              </NavLink>
            </li>
          </ul>

          {/* auth */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="px-6 py-2 rounded-md bg-primary cursor-pointer">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-6 py-2 rounded-md bg-primary/50 cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
