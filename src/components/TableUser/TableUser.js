import { useState } from "react";

function TableUser() {
  const [listUsers, setListUsers] = useState([
    {
      id: 7,
      username: "Bé Quang",
      email: "buithanhquangqn22@gmail.com",
      role: "USER",
    },
    {
      id: 5,
      username: "21522507",
      email: "21522507@gm.uit.edu.vn",
      role: "USER",
    },
  ]);

  return (
    <>
      <table className="table table-info table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user) => {
            return (
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableUser;
