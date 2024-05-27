import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
          <Modal.Title>{t("modal.quiz.delete.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modal.quiz.delete.body")} <b>{dataDelete.id}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modal.quiz.delete.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteQuiz();
            }}
          >
            {t("modal.quiz.delete.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
