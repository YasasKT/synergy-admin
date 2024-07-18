import { NavLink } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import { User } from "./../models/user";
import * as UsersApi from "../../network/users_api";

interface HeaderProps {
  user: User | null;
  // onSignUpClicked: () => void;
  // onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const Header = ({ user, onLogoutSuccessful }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLogoutPopup, setShowLogoutpopup] = useState<boolean>(false);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleScroll = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  async function logout() {
    try {
      await UsersApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <header className="header">
      <section className="flex">
        <NavLink to="/admin">
          <div className="logo-container">
            <div className="img-container">
              <img src="/img/synergy_logo_blue1.png" alt="synergy-logo" />
            </div>
            <div className="header-title">
              <span className="admin">Admin</span>
              <span className="panel">Panel</span>
            </div>
          </div>
        </NavLink>
        <nav className={isActive === true ? "navbar active" : "navbar"}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Projects
          </NavLink>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Blogs
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Messages
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Clients
          </NavLink>
        </nav>

        <div className="icons">
          <i className="ri-menu-line" id="menu-icon" onClick={toggleMenu}></i>
          <i
            className="ri-user-3-fill"
            id="profile-icon"
            onClick={handleDropdownToggle}
          ></i>
          {isDropdownVisible && (
            <div
              className="dropdown-menu"
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <NavLink to="/admin/profile" className="dropdown-item">
                Manage My Account
              </NavLink>
              <div
                className="dropdown-item"
                onClick={() => setShowLogoutpopup(true)}
              >
                Logout
              </div>

              {showLogoutPopup && (
                <ConfirmationPopup
                  message="Are you sure you want to logout?"
                  onCancel={() => setShowLogoutpopup(false)}
                  onConfirm={logout}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
