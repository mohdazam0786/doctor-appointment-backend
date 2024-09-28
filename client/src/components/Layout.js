import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import image from "../assessts/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message, Avatar } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Search",
      path: "/search",
      icon: "fa-solid fa-search",
    },
  ];

  // Rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
    <div className="app-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={image} alt="Logo" />
          </Link>
          <hr />
        </div>
        <div className="menu sm:flex gap-4">
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;

            return (
              <div
                key={menu.path}
                className={`menu-item ${isActive && "active"}`}
              >
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>

        <div
          className="header-content"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <Badge
            count={user && user.notifcation.length}
            onClick={() => {
              navigate("/notification");
            }}
          >
            <i className="fa-solid fa-bell notification-icon"></i>
          </Badge>

          {/* Replace profile name with Avatar */}
          <Link to="/profile">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              size="large"
              icon={<i className="fa-solid fa-user"></i>}
              className="avatar"
            />
          </Link>

          {/* Move Logout to the far right */}
          <div
            className="menu-item"
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="body">{children}</div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} muhammad azam. All rights
            reserved.
          </p>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Layout;
