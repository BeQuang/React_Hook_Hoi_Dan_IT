import { CgFileAdd } from "react-icons/cg";
import Button from "react-bootstrap/Button";

import "./Information.scss";
import { useState } from "react";

function Information() {
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleUpLoadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };
  return (
    <>
      <form className="information">
        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select className="form-control" disabled>
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
        <Button variant="primary" className="btn-info mt-3">
          Update
        </Button>
      </form>
    </>
  );
}

export default Information;
