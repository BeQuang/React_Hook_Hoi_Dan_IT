import { useState } from "react";
import { toast } from "react-toastify";

import "./ChangePass.scss";
import { postChangePasswordProfile } from "../../../services/authService";
import { validatePassword } from "../../Validate/Validate";

function ChangePass() {
  const [currentPass, setCurrentPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleChangePass = async () => {
    // validate
    if (!validatePassword(newPass)) {
      toast.error(
        "NewPassword of at least 6 characters including numbers and capital characters"
      );
      return;
    }

    if (currentPass === confirmPass) {
      const res = await postChangePasswordProfile(currentPass, newPass);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
    } else {
      toast.error("Confirm password does not match");
    }
  };

  return (
    <div className="change-pass">
      <div className="form-row mb-3">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Current Password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group confirm">
        <label>Confirm password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Confirm password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </div>
      <button
        className="btn btn-info mt-4 mb-2"
        onClick={() => handleChangePass()}
      >
        Change Password
      </button>
    </div>
  );
}

export default ChangePass;
