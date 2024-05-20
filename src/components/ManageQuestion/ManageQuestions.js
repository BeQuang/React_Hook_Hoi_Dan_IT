import { useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import "./ManageQuestions.scss";

function ManageQuestions() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    } else if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);

      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  return (
    <div className="manage-questions">
      <div className="title">ManageQuestions</div>
      <hr />
      <div className="add-questions">
        <div className="col-6 form-group"></div>
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={options}
          className="col-6"
        />
      </div>
      <div className="mt-3 mb-2">Add questions:</div>
      <div className="">
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                    />
                    <label>Questions {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload">
                      <RiImageAddFill />
                    </label>
                    <input type="file" hidden />
                    <span>myImage.png</span>
                  </div>
                  <div className="btn-group">
                    <span
                      className="icon-add"
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                    >
                      <BsPatchPlusFill />
                    </span>
                    {questions.length > 1 && (
                      <span
                        className="icon-remove"
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsPatchMinusFill />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                        />
                        <div className="form-floating name">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Answer 1"
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            className="icon-add"
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <FiPlusCircle />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              className="icon-remove"
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <FiMinusCircle />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ManageQuestions;
