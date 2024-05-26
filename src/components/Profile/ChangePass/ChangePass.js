import "./ChangePass.scss";

function ChangePass() {
  return (
    <div className="change-pass">
      <div className="form-row mb-3">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Current Password"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="New Password"
          />
        </div>
      </div>
      <div className="form-group confirm">
        <label>Confirm password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Confirm password"
        />
      </div>
      <button className="btn btn-info mt-4 mb-2">Change Password</button>
    </div>
  );
}

export default ChangePass;
