import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

function TableUserPaginate({
  listUsers,
  handleClickBtnView,
  handleClickBtnUpdate,
  handleClickBtnDelete,
  fetchListUsersWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) {
  const { t } = useTranslation();

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchListUsersWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };
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
      <div className="d-flex justify-content-center pt-4">
        <ReactPaginate
          nextLabel={t("admin.users.next")}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={t("admin.users.prev")}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
}

export default TableUserPaginate;
