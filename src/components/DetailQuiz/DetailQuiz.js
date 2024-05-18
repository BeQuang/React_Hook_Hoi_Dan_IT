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

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

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
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionsDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  // console.log("check >>>>>", dataQuiz, dataQuiz[index]);

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
        />
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-info" onClick={() => handleNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">countdown</div>
    </div>
  );
}

export default DetailQuiz;
