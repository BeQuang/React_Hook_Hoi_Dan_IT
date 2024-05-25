import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

import "./Admin.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Languages from "../../components/Languages/Languages";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)} className="icon">
            <FaBars />
          </span>
          <div className="info">
            <Languages />
            <NavDropdown
              title={t("homepage.header.buttonSettings")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                {t("homepage.header.itemProfile")}
              </NavDropdown.Item>
              <NavDropdown.Item>
                {t("homepage.header.itemLogout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default Admin;
