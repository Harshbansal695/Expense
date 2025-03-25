import React from "react";
import Logo from "./Shared/Logo";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(false);
        localStorage.removeItem("user");
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="border-b border-gray-200 shadow-md bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6 lg:px-8">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer transition-transform transform hover:scale-105">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="bg-white border border-gray-200 rounded-md p-3 shadow-lg">
              <Button
                variant="outline"
                onClick={logoutHandler}
                className="w-full text-red-500 hover:bg-red-100"
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-all">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
