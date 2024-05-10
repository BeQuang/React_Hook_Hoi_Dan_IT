import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  //   FaTachometerAlt,
  FaGem,
  //   FaList,
  FaGithub,
  //   FaRegLaughWink,
  //   FaHeart,
} from "react-icons/fa";
import { SiRiotgames } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import sidebarBg from "../../assets/image/sidebar.jpg";
import "react-pro-sidebar/dist/css/styles.css";

function Sidebar({ image, collapsed, toggled, handleToggleSidebar }) {
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
            <div className="logo">
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
            <MenuItem icon={<MdDashboard />}>Dashboard</MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={"Features"}>
              <MenuItem>Users manage</MenuItem>
              <MenuItem>Quizzes manage</MenuItem>
              <MenuItem>Questions manage</MenuItem>
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
