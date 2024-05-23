import { useEffect, useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";

import "./QuizQA.scss";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpSertQA,
} from "../../services/quizService";
import { validAnswers, validQuestions } from "../Validate/Validate";
import { base64ToFile, fileToBase64 } from "../ConvertImage/ConvertImage";

function QuizQA() {
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const INIT_QUESTIONS = [
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
  ];
  const [questions, setQuestions] = useState(INIT_QUESTIONS);

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuiz]);

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newOptionsQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.description}`,
        };
      });
      setListQuiz(newOptionsQuiz);
    }
  };

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // convert base64 to File Object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let question = res.DT.qa[i];
        if (question.imageFile) {
          question.imageName = `Questions-${question.id}.png`;
          question.imageFile = await base64ToFile(
            `data:image/png;base64,${question.imageFile}`,
            `Questions-${question.id}.png`,
            "image/png"
          );
        }
        newQA.push(question);
      }

      setQuestions(newQA);
    }
  };

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

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);

      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index !== -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index !== -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        // eslint-disable-next-line array-callback-return
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
    }

    setQuestions(questionsClone);
  };

  const handleUpdateQuestionForQuiz = async () => {
    // todo and validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }

    // Validate answers
    const validAnswer = validAnswers(questions);

    if (!validAnswer.isValidAnswer) {
      toast.error(
        `Not empty Answer ${validAnswer.indexAnswer} at Question ${validAnswer.indexQuestion}`
      );
      return;
    } else if (!validAnswer.isValidAnswerCorrect) {
      toast.error(
        `Choose at least one correct answer in the question ${validAnswer.indexQuestion}`
      );
      return;
    }

    // Validate Question
    const validQuestion = validQuestions(questions);

    if (!validQuestion.isValidQuestion) {
      toast.error(`Not empty description for Question ${validQuestion.indexQ}`);
      return;
    }

    // Update Question use for ... of ...
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await fileToBase64(
          questionsClone[i].imageFile
        );
      }
    }

    let res = await postUpSertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };

  const handleImagePreview = (title, imageFile) => {
    setDataImagePreview({
      title,
      url: URL.createObjectURL(imageFile),
    });
    setIsPreviewImage(true);
  };

  return (
    <div className="manage-questions">
      <div className="add-questions">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            className="col-6"
          />
        </div>
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
                      value={question.description}
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Questions {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`} className="label-upload">
                      <RiImageAddFill />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleOnChangeFileQuestion(question.id, e)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          className="pointer"
                          onClick={() =>
                            handleImagePreview(
                              question.imageName,
                              question.imageFile
                            )
                          }
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "No files available"
                      )}
                    </span>
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
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating name">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Answer 1"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
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
        <div className="btn-save">
          <button
            className="btn btn-info"
            onClick={() => handleUpdateQuestionForQuiz()}
          >
            Save Questions
          </button>
        </div>
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
}

export default QuizQA;
