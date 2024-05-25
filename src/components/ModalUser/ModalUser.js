import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgFileAdd } from "react-icons/cg";
import _ from "lodash";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./ModalUser.scss";
import {
  validateEmail,
  validateEmpty,
  validatePassword,
} from "../Validate/Validate";
import { postCreateUser, putUpdateUser } from "../../services/userService";

function ModalUser({
  show,
  setShow,
  fetchListUsers,
  fetchListUsersWithPaginate,
  dataUpdate,
  typeModal,
  resetDataUpdate,
  currentPage,
  setCurrentPage,
}) {
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setAvatar("");
    setPreviewImage("");
    resetDataUpdate();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  // eslint-disable-next-line
  const [avatar, setAvatar] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabledView, setDisabledView] = useState(false);
  const [title, setTitle] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    switch (typeModal) {
      case "Create":
        setDisabled(false);
        setDisabledView(false);
        setTitle(t("admin.users.btnAdd"));
        break;
      case "Update":
        setDisabled(true);
        setDisabledView(false);
        setTitle(t("admin.users.btnUpdate"));
        break;
      case "View":
        setDisabledView(true);
        setTitle(t("admin.users.btnView"));
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // await fetchListUsers();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    } else {
      toast.error(data.EM);
    }
  };

  // Handle Update Data
  const handSubmitUpdateUser = async () => {
    // validate
    if (!validateEmpty(username)) {
      toast.error("Please enter the username field");
      return;
    }

    const data = await putUpdateUser(dataUpdate.id, username, role, avatar);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchListUsers();
      await fetchListUsersWithPaginate(currentPage);
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
        className="modal-user"
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
                <label>{t("admin.users.password")}</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={t("admin.users.password")}
                  value={password}
                  disabled={disabled}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>{t("admin.users.username")}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("admin.users.username")}
                  value={username}
                  disabled={disabledView}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>{t("admin.users.role")}</label>
                <select
                  className="form-control"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  disabled={disabledView}
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
                  {t("admin.users.uploadImage")}
                </label>
                <input
                  id="labelUpload"
                  type="file"
                  hidden
                  disabled={disabledView}
                  onChange={(e) => handleUpLoadImage(e)}
                />
              </div>
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={previewImage} />
              ) : (
                <span>{t("admin.users.previewImage")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.users.close")}
          </Button>
          {typeModal === "Create" ? (
            <Button variant="primary" onClick={handSubmitCreateUser}>
              {t("admin.users.save")}
            </Button>
          ) : typeModal === "Update" ? (
            <Button variant="primary" onClick={handSubmitUpdateUser}>
              {t("admin.users.save")}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
