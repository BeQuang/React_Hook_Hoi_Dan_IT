import { useState, useEffect } from "react";
import "./ManageUser.scss";
// import ModalCreateUser from "../ModalUser/ModalCreateUser";
// import ModalUpdateUser from "../ModalUser/ModalUpdateUser";
import { GoPlus } from "react-icons/go";
import TableUser from "../TableUser/TableUser";
import { getAllUsers } from "../../services/userService";
import ModalUser from "../ModalUser/ModalUser";
import ModalDeleteUser from "../ModalUser/ModalDeleteUser";

function ManageUser() {
  // const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  // const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnCreate = () => {
    // setShowModalCreateUser(true);
    setTypeModal("Create");
    setShow(true);
  };

  const handleClickBtnUpdate = (user) => {
    // setShowModalUpdateUser(true);
    setTypeModal("Update");
    setDataUpdate(user);
    setShow(true);
  };

  const handleClickBtnView = (user) => {
    setTypeModal("View");
    setDataUpdate(user);
    setShow(true);
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  return (
    <div className="manage-user">
      <div className="title">Manage User</div>
      <div className="content">
        <div className="btn-add-user">
          <button
            className="btn btn-info"
            onClick={() => handleClickBtnCreate()}
          >
            <GoPlus />
            Add new users
          </button>
        </div>
        <div className="table-users">
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        {/* <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        /> */}
        {/* <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUsers={fetchListUsers}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
        /> */}
        <ModalUser
          show={show}
          setShow={setShow}
          fetchListUsers={fetchListUsers}
          dataUpdate={dataUpdate}
          typeModal={typeModal}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
        />
      </div>
    </div>
  );
}

export default ManageUser;
