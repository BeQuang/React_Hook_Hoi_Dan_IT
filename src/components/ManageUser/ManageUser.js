import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";

function ManageUser() {
  return (
    <div className="mmanage-user">
      <div className="title">Manage User</div>
      <div className="content">
        <div>
          <button>Add new users</button>
        </div>
        <div>table users</div>
        <ModalCreateUser />
      </div>
    </div>
  );
}

export default ManageUser;
