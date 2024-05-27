import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataModalResult, handleShowAnswer }) => {
  const handleClose = () => setShow(false);
  const { t } = useTranslation();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.quiz.result.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("modal.quiz.result.totalQuestion")}{" "}
            <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("modal.quiz.result.totalCorrect")}{" "}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            {t("modal.quiz.result.show")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("modal.quiz.result.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
