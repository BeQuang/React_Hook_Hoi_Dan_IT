import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars onClick={() => setCollapsed(!collapsed)} />
      </div>
    </div>
  );
}

export default Admin;
