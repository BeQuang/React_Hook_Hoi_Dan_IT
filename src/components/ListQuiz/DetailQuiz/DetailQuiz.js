import { useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { getDataQuiz } from "../../../services/questionsService";

function DetailQuiz() {
  const params = useParams();
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

  return <div className="detail-quiz">DetailQuiz</div>;
}

export default DetailQuiz;
