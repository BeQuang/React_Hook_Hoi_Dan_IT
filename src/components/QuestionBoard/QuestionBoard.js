import { useRef } from "react";
import Countdown from "../Countdown/Countdown";
import "./QuestionBoard.scss";

function QuestionBoard({ dataQuiz, handleFinish, setIndex }) {
  const refDiv = useRef([]);

  const getClassQuestion = (question) => {
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    setIndex(index);

    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return;
      }
    }

    refDiv.current[index].className = "question clicked";
  };

  return (
    <div className="question-board">
      <div className="countdown">
        <Countdown onTimeUp={handleFinish} />
      </div>
      <div className="list-questions">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-${item.questionId}`}
                className={getClassQuestion(item)}
                onClick={() => handleClickQuestion(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default QuestionBoard;
