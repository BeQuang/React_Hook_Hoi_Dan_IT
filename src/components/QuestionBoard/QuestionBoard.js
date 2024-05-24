import "./QuestionBoard.scss";

function QuestionBoard({ dataQuiz }) {
  console.log(dataQuiz);
  return (
    <div className="question-board">
      <div className="countdown">10:10</div>
      <div className="list-questions">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={`question-${item.questionId}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default QuestionBoard;
