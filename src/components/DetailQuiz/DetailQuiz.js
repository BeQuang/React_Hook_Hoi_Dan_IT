import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

import "./DetailQuiz.scss";
import { getDataQuiz } from "../../services/questionsService";
import QuestionItem from "./QuestionItem/QuestionItem";

function DetailQuiz() {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

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

  const handleFinish = () => {};

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
    <div className="detail-quiz container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state.quizTitle}
        </div>
        <hr />
        <QuestionItem
          index={index}
          data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          handleStateCheckBox={handleStateCheckBox}
        />
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-info" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">countdown</div>
    </div>
  );
}

export default DetailQuiz;
