import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { deleteQuizForAdmin } from "../../services/quizService";

const ModalDeleteQuiz = ({
  show,
  setShow,
  fetchListQuizzes,
  fetchListUsersWithPaginate,
  dataDelete,
  currentPage,
  setCurrentPage,
}) => {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    const data = await deleteQuizForAdmin(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuizzes();
      //   setCurrentPage(1);
      //   await fetchListUsersWithPaginate(1);
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
        className="modal-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conform Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz? Id: <b>{dataDelete.id}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteQuiz();
            }}
          >
            Conform
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
