import { useEffect, useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./ManageQuestions.scss";
import { getAllQuizForAdmin } from "../../services/quizService";
import { postCreateNewQuestionForQuiz } from "../../services/questionsService";
import { postCreateNewAnswerForQuestion } from "../../services/answerService";
import { validAnswers, validQuestions } from "../Validate/Validate";

function ManageQuestions() {
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
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newOptionsQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.name}`,
        };
      });
      setListQuiz(newOptionsQuiz);
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

  const handleSubmitQuestionForQuiz = async () => {
    // todo and validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error(t("toast.chooseQuiz"));
      return;
    }

    // Validate answers
    const validAnswer = validAnswers(questions);

    if (!validAnswer.isValidAnswer) {
      toast.error(
        `${t("toast.notAnswer")} ${validAnswer.indexAnswer} ${t(
          "toast.atQuestion"
        )} ${validAnswer.indexQuestion}`
      );
      return;
    } else if (!validAnswer.isValidAnswerCorrect) {
      toast.error(`${t("toast.validAnswer")} ${validAnswer.indexQuestion}`);
      return;
    }

    // Validate Question
    const validQuestion = validQuestions(questions);

    if (!validQuestion.isValidQuestion) {
      toast.error(`${t("toast.validQuestion")} ${validQuestion.indexQ}`);
      return;
    }

    // submit Questions use Promise.all()
    // await Promise.all(
    //   questions.map(async (question) => {
    //     const createQuestion = await postCreateNewQuestionForQuiz(
    //       +selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );
    // submit Answer
    //     await Promise.all(
    //       question.answers.map(async (answer) => {
    //         await postCreateNewAnswerForQuestion(
    //           answer.description,
    //           answer.isCorrect,
    //           createQuestion.DT.id
    //         );
    //       })
    //     );
    //     console.log("check res >>>>>", createQuestion);
    //   })
    // );

    // submit Question use for ... of ...
    for (const question of questions) {
      const createQuestion = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // submit Answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          createQuestion.DT.id
        );
      }
    }

    toast.success(t("toast.createSuccess"));
    setQuestions(INIT_QUESTIONS);
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
      <div className="title">{t("admin.QuestionsManager")}</div>
      <hr />
      <div className="add-questions">
        <div className="col-6 form-group">
          <label className="mb-2">{t("admin.quiz.question.select")}</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            className="col-6"
          />
        </div>
      </div>
      <div className="mt-3 mb-2">{t("admin.quiz.question.add")}</div>
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
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>
                      {t("admin.quiz.question.qLabelAbove")} {index + 1}
                      {t("admin.quiz.question.qLabelBelow")}
                    </label>
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
                        t("admin.quiz.question.noFile")
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
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
                          />
                          <label>
                            {t("admin.quiz.question.answer")} {index + 1}
                          </label>
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
            onClick={() => handleSubmitQuestionForQuiz()}
          >
            {t("admin.quiz.question.save")}
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

export default ManageQuestions;
