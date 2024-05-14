import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../services/userService";
import { toast } from "react-toastify";

const ModalDeleteUser = ({
  show,
  setShow,
  fetchListUsers,
  fetchListUsersWithPaginate,
  dataDelete,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conform Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user? Email:{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteUser();
            }}
          >
            Conform
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
