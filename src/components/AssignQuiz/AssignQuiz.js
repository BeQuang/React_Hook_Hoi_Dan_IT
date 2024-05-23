import Select from "react-select";
import { useState, useEffect } from "react";

import "./AssignQuiz.scss";
import { getAllQuizForAdmin } from "../../services/quizService";
import { getAllUsers } from "../../services/userService";

function AssignQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newOptionsQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.description}`,
        };
      });
      setListQuiz(newOptionsQuiz);
    }
  };

  const fetchAllUser = async () => {
    const res = await getAllUsers();
    if (res && res.EC === 0) {
      let newOptionsUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.username} - ${item.email}`,
        };
      });
      setListUser(newOptionsUser);
    }
  };

  return (
    <div className="assign-quiz row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          className="col-10"
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          className="col-10"
        />
      </div>
      <div>
        <button className="btn btn-info mt-3">Assign</button>
      </div>
    </div>
  );
}

export default AssignQuiz;
