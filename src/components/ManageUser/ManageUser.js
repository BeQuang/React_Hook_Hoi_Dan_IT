import { useState, useEffect } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import { GoPlus } from "react-icons/go";
import TableUser from "../TableUser/TableUser";
import { getAllUsers } from "../../services/userService";

function ManageUser() {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  return (
    <div className="manage-user">
      <div className="title">Manage User</div>
      <div className="content">
        <div className="btn-add-user">
          <button
            className="btn btn-info"
            onClick={() => setShowModalCreateUser(true)}
          >
            <GoPlus />
            Add new users
          </button>
        </div>
        <div className="table-users">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
}

export default ManageUser;
