/* eslint-disable jsx-a11y/alt-text */
import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

import "./QuestionItem.scss";

function QuestionItem({
  index,
  data,
  handleStateCheckBox,
  isShowAnswer,
  isSubmitQuiz,
}) {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const { t } = useTranslation();

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBox = (e, answerId, questionId) => {
    handleStateCheckBox(answerId, questionId);
  };

  return (
    <div className="question-item">
      {data.image ? (
        <div className="body">
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="body"></div>
      )}
      <div className="content">
        <div className="question">
          {t("users.detailQuiz.question")} {index + 1}:{" "}
          {data.questionsDescription}
        </div>
        <div className="answer-list">
          {data.answers &&
            data.answers.length > 0 &&
            data.answers.map((answer, index) => {
              return (
                <div key={`answer-${index}`} className="answer-item">
                  <div className="form-check">
                    <input
                      id={`checkbox-${index}-${index}`}
                      className="form-check-input"
                      type="checkbox"
                      checked={answer.isSelected}
                      disabled={isSubmitQuiz}
                      onChange={(e) =>
                        handleCheckBox(e, answer.id, data.questionId)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${index}-${index}`}
                    >
                      {answer.description}
                    </label>
                    {isShowAnswer === true && (
                      <>
                        {answer.isSelected === true &&
                          answer.isCorrect === false && (
                            <IoIosClose className="incorrect" />
                          )}

                        {answer.isCorrect === true && (
                          <IoIosCheckmark className="correct" />
                        )}
                      </>
                    )}
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
