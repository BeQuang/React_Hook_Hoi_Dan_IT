import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

function TableUser() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  return (
    <>
      <table className="table table-info table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
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
                  <button className="btn btn-secondary ">View</button>
                  <button className="btn btn-warning mx-3">Update</button>
                  <button className="btn btn-danger">Delete</button>
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
