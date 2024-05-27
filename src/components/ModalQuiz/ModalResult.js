import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({ show, setShow, dataModalResult, handleShowAnswer }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result....</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Question: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answers: <b>{dataModalResult.countCorrect}</b>
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
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
