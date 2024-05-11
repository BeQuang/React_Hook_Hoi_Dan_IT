import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgFileAdd } from "react-icons/cg";
import "./ModalCreateUser.scss";
import axios from "axios";
import { toast } from "react-toastify";

function ModalCreateUser({ show, setShow }) {
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

  const handleUpLoadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handSubmitCreateUser = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    // call APIs
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", avatar);

    const res = await axios.post(
      "http://localhost:8081/api/v1/participant",
      data
    );
    console.log(res);

    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
    } else {
      toast.error(res.data.EM);
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
          <Modal.Title>Add new user</Modal.Title>
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

export default ModalCreateUser;
