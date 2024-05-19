import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../services/quizService";

function TableQuiz() {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleClickBtnUpdate = () => {};

  const handleClickBtnDelete = () => {};

  return (
    <table className="table table-info table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name Quiz</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.map((quiz, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td>{quiz.difficulty}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickBtnUpdate()}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickBtnDelete()}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableQuiz;
