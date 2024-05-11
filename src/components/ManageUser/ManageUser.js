import "./ManageUser.scss";
import ModelCreateUser from "./ModelCreateUser/ModelCreateUser";

function ManageUser() {
  return (
    <div className="mmanage-user">
      <div className="title">Manage User</div>
      <div className="content">
        <div>
          <button>Add new users</button>
        </div>
        <div>
          table users
          <ModelCreateUser />
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
