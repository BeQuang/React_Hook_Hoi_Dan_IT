import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgFileAdd } from "react-icons/cg";
import "./ModalUser.scss";
import { toast } from "react-toastify";
import {
  validateEmail,
  validateEmpty,
  validatePassword,
} from "../Validate/Validate";
import { postCreateUser } from "../../services/userService";
import _ from "lodash";

function ModalUser({ show, setShow, fetchListUsers, dataUpdate, typeModal }) {
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setAvatar("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  // eslint-disable-next-line
  const [avatar, setAvatar] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (typeModal) {
      case "Create":
        setDisabled(false);
        setTitle("Add new user");
        break;
      case "Update":
        setDisabled(true);
        setTitle("Update a user");
        break;
      default:
    }
  }, [typeModal]);

  // Handle Update User
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUpLoadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };

  // Handle Create User
  const handSubmitCreateUser = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password of at least 6 characters including numbers and capital characters"
      );
      return;
    }
    if (!validateEmpty(username)) {
      toast.error("Please enter the username field");
      return;
    }

    const data = await postCreateUser(email, password, username, role, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListUsers();
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
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  disabled={disabled}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  disabled={disabled}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Role</label>
                <select
                  className="form-control"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option>USER</option>
                  <option value="ADMIN">ADMIN</option>
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
          <Button variant="primary" onClick={handSubmitCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
