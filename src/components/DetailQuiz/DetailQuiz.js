import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

import "./DetailQuiz.scss";
import { getDataQuiz } from "../../services/questionsService";

function DetailQuiz() {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

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
      console.log("check data >>>>", data);
    }
  };

  return (
    <div className="detail-quiz container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state.quizTitle}
        </div>
        <hr />
        <div className="body">
          <img />
        </div>
        <div className="content">
          <div className="question">Question 1: How are you doing?</div>
          <div className="answer-list">
            <div className="answer-item">A. haha</div>
            <div className="answer-item">B. hehe</div>
            <div className="answer-item">C. hihi</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-info">Next</button>
        </div>
      </div>
      <div className="right-content">countdown</div>
    </div>
  );
}

export default DetailQuiz;
