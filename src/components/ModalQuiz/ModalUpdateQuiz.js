import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgFileAdd } from "react-icons/cg";
import { toast } from "react-toastify";
import _ from "lodash";

import "./ModalQuiz.scss";
import { validateEmpty } from "../Validate/Validate";
import { putUpdateQuizForAdmin } from "../../services/quizService";

function ModalUpdateQuiz({
  show,
  setShow,
  fetchListQuizzes,
  fetchListQuizzesWithPaginate,
  dataUpdate,
  resetDataUpdate,
  currentPage,
  setCurrentPage,
}) {
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("USER");
    setImage("");
    setPreviewImage("");
    resetDataUpdate();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  // eslint-disable-next-line
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUpLoadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handSubmitUpdateQuiz = async () => {
    // validate
    if (!validateEmpty(name)) {
      toast.error("Please enter the Name Quiz field");
      return;
    } else if (!validateEmpty(description)) {
      toast.error("Please enter the Description field");
      return;
    }

    const data = await putUpdateQuizForAdmin(
      dataUpdate.id,
      name,
      description,
      type,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuizzes();
      //   await fetchListQuizzesWithPaginate(currentPage);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Name Quiz</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Quiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Type</label>
                <select
                  className="form-control"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="btn-upload" htmlFor="labelUpload">
                  <CgFileAdd />
                  Upload image
                </label>
                <input
                  id="labelUpload"
                  type="file"
                  hidden
                  onChange={(e) => handleUpLoadImage(e)}
                />
              </div>
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={previewImage} />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handSubmitUpdateQuiz}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuiz;
