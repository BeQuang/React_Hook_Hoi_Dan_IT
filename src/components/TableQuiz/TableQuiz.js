import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../services/quizService";
import ModalDeleteQuiz from "../ModalQuiz/ModalDeleteQuiz";
import ModalUpdateQuiz from "../ModalQuiz/ModalUpdateQuiz";
import { useTranslation } from "react-i18next";

function TableQuiz() {
  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});

    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleClickBtnEdit = (quiz) => {
    setDataUpdate(quiz);
    setIsShowModalUpdate(true);
  };

  const handleClickBtnDelete = (quiz) => {
    setDataDelete(quiz);
    setIsShowModalDelete(true);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  return (
    <>
      <table className="table table-info table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("admin.quiz.name")}</th>
            <th scope="col">{t("admin.quiz.description")}</th>
            <th scope="col">{t("admin.quiz.type")}</th>
            <th scope="col">{t("admin.quiz.action")}</th>
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
                      onClick={() => handleClickBtnEdit(quiz)}
                    >
                      {t("admin.quiz.edit")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(quiz)}
                    >
                      {t("admin.quiz.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        fetchListQuizzes={fetchAllQuiz}
        dataUpdate={dataUpdate}
        resetDataUpdate={resetDataUpdate}
      />
      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        fetchListQuizzes={fetchAllQuiz}
        dataDelete={dataDelete}
      />
    </>
  );
}

export default TableQuiz;
