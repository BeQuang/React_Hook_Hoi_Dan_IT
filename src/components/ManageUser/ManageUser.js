import { useState, useEffect } from "react";
import "./ManageUser.scss";
// import ModalCreateUser from "../ModalUser/ModalCreateUser";
// import ModalUpdateUser from "../ModalUser/ModalUpdateUser";
import { GoPlus } from "react-icons/go";
// import TableUser from "../TableUser/TableUser";
import { getAllUsers, getUserWithPaginate } from "../../services/userService";
import ModalUser from "../ModalUser/ModalUser";
import ModalDeleteUser from "../ModalUser/ModalDeleteUser";
import TableUserPaginate from "../TableUser/TableUserPaginate";

function ManageUser() {
  const LIMIT_USER = 10;
  // const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  // const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [typeModal, setTypeModal] = useState("");
  const [show, setShow] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
        {/* <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
        <ModalUser
          show={show}
          setShow={setShow}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          dataUpdate={dataUpdate}
          typeModal={typeModal}
          resetDataUpdate={resetDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          dataDelete={dataDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ManageUser;
