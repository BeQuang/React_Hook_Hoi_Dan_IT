/* eslint-disable jsx-a11y/alt-text */
import _ from "lodash";

import "./QuestionItem.scss";

function QuestionItem({ index, data }) {
  console.log(data);
  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <div className="question-item">
      {data.image && (
        <div className="body">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      )}
      <div className="content">
        <div className="question">
          Question {index + 1}: {data.questionDescription}
        </div>
        <div className="answer-list">
          {data.answers &&
            data.answers.length > 0 &&
            data.answers.map((answer, index) => {
              return (
                <div key={`answer-${index}`} className="answer-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label">
                      {answer.description}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
