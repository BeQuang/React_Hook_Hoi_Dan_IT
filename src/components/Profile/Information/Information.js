import { CgFileAdd } from "react-icons/cg";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import "./Information.scss";
import { useEffect, useState } from "react";
import { postInformationProfile } from "../../../services/authService";
import { fileToBase64 } from "../../Convert/Convert";
import { userUpdateInformation } from "../../../redux/action/userAction";

function Information() {
  const [previewImage, setPreviewImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [imageUpdate, setImageUpdate] = useState("");
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(account.username);
    setEmail(account.email);
    setRole(account.role);
    setImageUpdate(account.image);
    if (account.image) {
      setPreviewImage(`data:image/jpeg;base64,${account.image}`);
    }
  }, [account]);

  const handleUpLoadImage = async (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      const image = await fileToBase64(e.target.files[0]);
      setAvatar(e.target.files[0]);
      setImageUpdate(image.slice(23));
    }
  };

  const handleChangeInformation = async () => {
    const res = await postInformationProfile(username, avatar);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(userUpdateInformation(account, username, imageUpdate));
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <form className="information">
        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input
              type="email"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select className="form-control" disabled value={role}>
              <option>USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </div>
        <div className="form-row pt-3">
          <div className="form-group">
            <label className="btn-upload" htmlFor="labelUpload">
              <CgFileAdd />
              Upload Image
            </label>
            <input
              id="labelUpload"
              type="file"
              hidden
              onChange={(e) => handleUpLoadImage(e)}
            />
          </div>
        </div>
        <div className="col-md-12 img-preview mt-3 mb-3">
          {previewImage ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={previewImage} />
          ) : (
            <span>Preview Image</span>
          )}
        </div>
        <Button
          variant="primary"
          className="btn-info mt-3"
          onClick={() => handleChangeInformation()}
        >
          Update
        </Button>
      </form>
    </>
  );
}

export default Information;
