import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./ChangePass.scss";
import { postChangePasswordProfile } from "../../../services/authService";
import { validatePassword } from "../../Validate/Validate";

function ChangePass() {
  const [currentPass, setCurrentPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const { t } = useTranslation();

  const handleChangePass = async () => {
    // validate
    if (!validatePassword(newPass)) {
      toast.error(t("toast.validNewPass"));
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
      toast.error(t("toast.validConfirm"));
    }
  };

  return (
    <div className="change-pass">
      <div className="form-row mb-3">
        <div className="form-group">
          <label>{t("profile.current")}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t("profile.current")}
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>{t("profile.new")}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t("profile.new")}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group confirm">
        <label>{t("profile.confirm")}</label>
        <input
          type="text"
          className="form-control"
          placeholder={t("profile.confirm")}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
      </div>
      <button
        className="btn btn-info mt-4 mb-2"
        onClick={() => handleChangePass()}
      >
        {t("profile.change")}
      </button>
    </div>
  );
}

export default ChangePass;
