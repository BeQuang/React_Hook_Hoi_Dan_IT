import { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import { GoPlus } from "react-icons/go";

function ManageUser() {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

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
        <div className="table-users">table users</div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
}

export default ManageUser;
