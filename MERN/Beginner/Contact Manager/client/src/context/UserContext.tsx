import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
};

type FormData = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  login: (formData: FormData) => Promise<any>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (formData: FormData): Promise<any> => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/me", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Fetch user failed:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser must be used inside UserContextProvider");

  return context;
};

export default UserContextProvider;
