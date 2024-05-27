import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { deleteUser } from "../../services/userService";

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
  const { t } = useTranslation();

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
          <Modal.Title>{t("modal.user.delete.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modal.user.delete.body")}{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modal.user.delete.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteUser();
            }}
          >
            {t("modal.user.delete.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
