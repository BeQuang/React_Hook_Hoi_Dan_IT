import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./DetailQuiz.scss";
import { getDataQuiz } from "../../services/questionsService";
import QuestionItem from "./QuestionItem/QuestionItem";
import { postSubmitAnswer } from "../../services/answerService";
import ModalResult from "../ModalQuiz/ModalResult";
import QuestionBoard from "../QuestionBoard/QuestionBoard";

function DetailQuiz() {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;

      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionsDescription,
            image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionsDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          answers = _.orderBy(answers, ["id"], ["asc"]);

          return { questionId: key, answers, questionsDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  // console.log("check >>>>>", dataQuiz, dataQuiz[index]);

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((answer) => {
          if (answer.isSelected === true) {
            userAnswerId.push(answer.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
    }

    payload.answers = answers;

    const res = await postSubmitAnswer(payload);
    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setIsShowModalResult(true);
      console.log(res);
    } else {
      alert("something wrongs.......");
    }
  };

  const handleStateCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // React-Hook doesn't merge state
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <>
      <Breadcrumb className="quiz-detail-new-header container">
        <NavLink to="/" className="breadcrumb-item">
          {t("homepage.header.navLinkHome")}
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          {t("homepage.header.navLinkUser")}
        </NavLink>
        <Breadcrumb.Item active>{t("users.doing")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz container">
        <div className="left-content">
          <div className="title">
            {t("users.title")} {quizId}: {location?.state.quizTitle}
          </div>
          <hr />
          <QuestionItem
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            handleStateCheckBox={handleStateCheckBox}
          />
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              {t("users.detailQuiz.btnPrev")}
            </button>
            <button className="btn btn-info" onClick={() => handleNext()}>
              {t("users.detailQuiz.btnNext")}
            </button>
            <button className="btn btn-warning" onClick={() => handleFinish()}>
              {t("users.detailQuiz.btnFinish")}
            </button>
          </div>
        </div>
        <div className="right-content">
          <QuestionBoard
            dataQuiz={dataQuiz}
            handleFinish={handleFinish}
            setIndex={setIndex}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
}

export default DetailQuiz;
