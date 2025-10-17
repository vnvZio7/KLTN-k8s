import { assets } from "../../assets/assets";
import { LayoutDashboardIcon, LogOut, LogOutIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const AdminSidebar = () => {
  const { handleLogout } = useUserContext();
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.imageProfile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboardIcon },
    { name: "Add Show", path: "/admin/add-shows", icon: LayoutDashboardIcon },
    {
      name: "List Shows",
      path: "/admin/list-shows",
      icon: LayoutDashboardIcon,
    },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Logout",
      path: "/",
      icon: LogOutIcon,
    },
  ];
  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
      <img
        className="h-15 md:h-30 w-15 md:w-30 rounded-full mx-auto"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-3 text-base max-md:hidden bg-primary px-3 py-0.5 rounded font-medium">
        {user.firstName}
      </p>
      <div className="w-full">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.name === "Logout" ? "#" : link.path}
            end
            onClick={(e) => {
              if (link.name === "Logout") {
                e.preventDefault(); // chặn chuyển trang
                handleLogout();
              }
            }}
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${
                isActive &&
                link.name !== "Logout" &&
                "bg-primary/15 text-primary group"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className={`w-1.5 h-10 rounded-l right-0 absolute ${
                    isActive && link.name !== "Logout" && "bg-primary"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
