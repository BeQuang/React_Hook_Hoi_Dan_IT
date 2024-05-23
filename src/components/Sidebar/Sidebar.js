import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem, FaGithub } from "react-icons/fa";
import { SiRiotgames } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

import sidebarBg from "../../assets/image/sidebar.jpg";
import "./Sidebar.scss";

function Sidebar({ image, collapsed, toggled, handleToggleSidebar }) {
  const navigate = useNavigate();

  const handleSwitchPageHome = () => {
    navigate("/");
  };

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div className="logo" onClick={() => handleSwitchPageHome()}>
              <SiRiotgames size={"2em"} />
              <div className="logo-text">
                <span>
                  RIOT <br /> GAMES
                </span>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={"Features"}>
              <MenuItem>
                Users manage <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quizzes manage <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                Questions manage <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://www.leagueoflegends.com/vi-vn/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Riot games
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
