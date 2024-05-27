import { useTranslation } from "react-i18next";

function TableUser({
  listUsers,
  handleClickBtnView,
  handleClickBtnUpdate,
  handleClickBtnDelete,
}) {
  const { t } = useTranslation();
  return (
    <>
      <table className="table table-info table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.users.username")}</th>
            <th scope="col">Email</th>
            <th scope="col">{t("admin.users.role")}</th>
            <th scope="col">{t("admin.users.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => {
            return (
              <tr key={`table-users-${index}`}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-secondary "
                    onClick={() => handleClickBtnView(user)}
                  >
                    {t("admin.users.view")}
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickBtnUpdate(user)}
                  >
                    {t("admin.users.update")}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickBtnDelete(user)}
                  >
                    {t("admin.users.delete")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableUser;
