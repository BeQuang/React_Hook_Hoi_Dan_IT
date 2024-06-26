/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getQuizByUser } from "../../services/quizService";
import "./ListQuiz.scss";

function ListQuiz() {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {t("users.title")} {index + 1}
                </h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-info"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                >
                  {t("users.btnStart")}
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && <div>{t("users.noTest")}</div>}
    </div>
  );
}

export default ListQuiz;
